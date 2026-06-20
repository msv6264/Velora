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

export async function getResourceCount(collectionId) {
    try {
        const { count, error } = await supabase
            .from("resource_collections")
            .select('*', { count: 'exact', head: true })
            .eq("collection_id", collectionId);

        if (error) {
            return { count: 0, error };
        }
        return { count: count || 0, error: null };
    } catch (err) {
        return { count: 0, error: err };
    }
}

export async function updateCollections(
    collection_id,
    collectionData,
    resourceIds = null
) {
    try {
        const { id, user_id, created_at, ...updatePayload } = collectionData;

        // Update collection metadata
        const { data, error } = await supabase
            .from("collections")
            .update(updatePayload)
            .eq("id", collection_id)
            .select()
            .single();

        if (error) {
            return { data: null, error };
        }

        // Update resource relations if provided
        if (resourceIds) {
            const { data: currentRelations, error: relErr } = await getRelations(collection_id);

            if (relErr) {
                return { data: null, error: relErr };
            }

            const currentIds = currentRelations.map(
                (r) => r.resource_id
            );

            // Resources to add
            const idsToAdd = resourceIds.filter(
                (id) => !currentIds.includes(id)
            );

            // Resources to remove
            const idsToRemove = currentIds.filter(
                (id) => !resourceIds.includes(id)
            );

            // Insert new relations
            if (idsToAdd.length > 0) {
                const rowsToInsert = idsToAdd.map((resource_id) => ({
                    collection_id,
                    resource_id,
                }));

                const { error: insertErr } = await supabase
                    .from("resource_collections")
                    .insert(rowsToInsert);

                if (insertErr) {
                    return { data: null, error: insertErr };
                }
            }

            // Delete removed relations
            if (idsToRemove.length > 0) {
                const { error: deleteErr } = await supabase
                    .from("resource_collections")
                    .delete()
                    .eq("collection_id", collection_id)
                    .in("resource_id", idsToRemove);

                if (deleteErr) {
                    return { data: null, error: deleteErr };
                }
            }
        }

        return { data, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}

export async function deleteCollections(collectionId) {
    try {
        const { data, error } = await supabase 
        .from ("collections") 
        .delete() 
        .eq("id", collectionId) 
        .select();

        if (error) {
            return { data: null, error };
        }

        const { data2, error2 } = await supabase
        .from("resource_collections")
        .delete()
        .eq("collection_id")

        if(error2){
            return { data: null, error: error2 };
        }

    } catch (error) {
        return { data: null, error: error };
    }
}