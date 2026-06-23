import { trackResourceVisit } from "@/services/rediscovery.service";

export async function handleRevisit (resId) {
  trackResourceVisit(resId);
}