import supabase from "@/lib/supabase";
import { dateSinceSaved, dateSinceVisit } from "@/utils/rediscoveryUtils";

export async function trackResourceVisit(resourceId) {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("last_visited_at, visit_count")
      .eq("id", resourceId)
      .single();

    if (error) throw error;

    const { last_visited_at, visit_count } = data;

    const THRESHOLD = 30 * 60 * 1000; // 30 mins

    const shouldIncrement = !last_visited_at || Date.now() - new Date(last_visited_at).getTime() > THRESHOLD;

    if (shouldIncrement) {
      console.log('i am getting updated');
      const { error: updateError } = await supabase
        .from("resources")
        .update({
          visit_count: visit_count + 1,
          last_visited_at: new Date().toISOString(),
        })
        .eq("id", resourceId);

      console.log("updateError:", updateError);

      if (updateError) throw updateError;
    }

    return { success: true };

  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}

export async function getRevisitNeeded() {
  try {
    const { data: resourceData, error } = await supabase
      .from("resources")
      .select("*");

    if (error) throw error;

    // Empty Library
    if (!resourceData || resourceData.length === 0) {
      return {
        type: "EMPTY_LIBRARY",
        message: "Start by saving your first resource.",
        resources: [],
        error: null,
      };
    }

    // Remove completed resources
    const activeResources = resourceData.filter(
      (resource) => resource.status !== "Completed"
    );

    // All resources completed
    if (activeResources.length === 0) {
      return {
        type: "ALL_COMPLETED",
        message: "You've completed all your resources.",
        resources: [],
        error: null,
      };
    }

    const hasVisitedAnyResource = activeResources.some(
      (resource) => resource.visit_count > 0
    );

    const allVisited = activeResources.every(
      (resource) => resource.visit_count > 0
    );

    const today = new Date();

    const resourcesWithScore = activeResources
      .map((resource) => {
        const savedDays = dateSinceSaved(
          today,
          new Date(resource.created_at)
        );

        const visitDays = resource.last_visited_at
          ? dateSinceVisit(
              today,
              new Date(resource.last_visited_at)
            )
          : savedDays;

        let score = savedDays + visitDays * 2;

        switch (resource.status) {
          case "Not Started":
            score += 100;
            break;

          case "Revisit Needed":
            score += 80;
            break;

          case "In Progress":
            score += 40;
            break;
        }

        if (resource.visit_count === 0) {
          score += 50;
        }

        return {
          ...resource,
          score,
          savedDays,
          visitDays,
        };
      })
      .sort((a, b) => b.score - a.score);

    return {
      type: !hasVisitedAnyResource
        ? "FIRST_REDISCOVERY"
        : allVisited
        ? "VISITED_ALL"
        : "NORMAL",
      message: null,
      resources: resourcesWithScore,
      error: null,
    };
  } catch (error) {
    return {
      type: "ERROR",
      message: "Failed to fetch rediscovery resources.",
      resources: [],
      error,
    };
  }
}