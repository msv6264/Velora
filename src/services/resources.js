import supabase from '../lib/supabase';

export async function createResource(resourceData) {
    try{
        const user_id = (await supabase.auth.getUser()).data.user.id;
        const {error, data} = await supabase
        .from('resources')
        .insert([
            {
                "title": resourceData.title,
                "url": resourceData.url,
                "category": resourceData.category,
                "user_id": user_id,
                "status": resourceData.status || 'not_started',
            }
        ])
        .select()

        if(error){
            return {error: error};
        } else
            return {data: data};

    }catch(err){
        console.error(err);
        return {data:null, error:err};
    }
}

export async function getResources() {
    try{
        const user_id = (await supabase.auth.getUser()).data.user.id;

        const { data, error } = await supabase.from('resources').select('*')
        if(error){
            return {error: error};
        } else
            return {data: data};
        
    } catch(err){
        console.error(err);
        return {data:null, error:err};
    }
}

export async function updateResource(resourceId, resourceData) {
    try {
        const user_id = (await supabase.auth.getUser()).data.user.id;

        const {error, data} = await supabase.from('resources')
        .update(resourceData)
        .eq('id', resourceId)
        .select();

        if (data)
            return {data: data};
        else
            return {error: error};

    } catch (err) {
        console.error(err);
        return {data:null, error:err};
    }
}

export async function deleteResource(resourceId) {
    console.log('I am in backend function deleteResource was called :>');
    try {
        const user_id = (await supabase.auth.getUser()).data.user.id;

        const { data, error } = await supabase
            .from('resources')
            .delete()
            .eq('id', resourceId)
            .select();

        if (error) {
            return { error: error };
        } else {
            return { data: data };
        }

    } catch (err) {
        console.error(err);
        return { data: null, error: err };
    }
}