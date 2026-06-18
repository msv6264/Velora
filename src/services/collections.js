import supabase from "@/lib/supabase";

export async function createCollection(collectionData, resourceIds) {
    try {
        const user_id = (await supabase.auth.getUser()).data.user.id;

        console.log('collectionData:', JSON.stringify(collectionData, null, 2));
        console.log('resourceIds:', JSON.stringify(resourceIds, null, 2));
        // collectionData: {
        //     "id": 1781801106250,
        //     "name": "sv",
        //     "count": 1,
        //     "icon": "Flame",
        //     "color": "from-rose-500/20 to-transparent"
        // }

        const { data: collection, error: collectionError } =
            await supabase
                .from("collections")
                .insert([
                    {
                        name: collectionData.name,
                        icon: collectionData.icon,
                        theme_color: collectionData.color,
                        user_id: user_id,
                    },
                ])
                .select()
                .single();

        if (collectionError) {
            console.log('error:', collectionError);
            return { data: null, error: collectionError };
        }

        const relations = resourceIds.map((resId) => ({
            collection_id: collection.id,
            resource_id: resId,
        }));

        const { error: relationsErr } = await supabase
            .from("resource_collections")
            .insert(relations);

        if (relationsErr) {
            console.log('relations error: ', relationsErr);
            return { data: null, error: relationsErr };
        }

        return { data: collection, error: null };

    } catch (err) {
        console.log('error in catch: ', err);
        return { data: null, error: err };
    }
}

export async function getCollections() {
    try {
        const { data: collectionData,  error: collectionError } = await supabase.from("collections").select("*");

        if (collectionError){
            return { data: null, error: collectionError };
        } else {
            return { data: collectionData, error: null };
        }

    } catch (err) {
        return { data: null, error: err };
    }
}

export async function getRelations(collectionId){
    try{
        const { data: relData, error: relErr } = await supabase
            .from("resource_collections")
            .select("resource_id")
            .eq("collection_id", collectionId)

        if (relErr){
            return { data: null, error: relErr };
        } else {
            return { data: relData, error: null };
        }

    } catch(err) {
        return { data: null, error: err };
    }
}