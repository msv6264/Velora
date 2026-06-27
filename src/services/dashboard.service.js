import supabase from "@/lib/supabase";

export async function getResourceCnt() {
    try {
        const { count, error } = await supabase
        .from('resources')
        .select('*', { count: "exact", head: true });

        if (error){
            console.log('Error: ', error);
            return { count: null, error: error };
        }

        return count;

    } catch (error) {
        console.log('Error: ', error);
        return { count: null, error: error };
    }
}

export async function getVisitedResourcesCnt() {
 try {
    const { count, error } = await supabase
    .from('resources')
    .select("*", {
        count: "exact", head: true
    }).neq("visit_count", 0);

    if (error){
        console.log('Error: ', error);
        return { count: null, error: error };
    }

    return count;

 } catch (error) {
    console.log('Error: ', error);
    return { count: null, error: error };
 }   
}