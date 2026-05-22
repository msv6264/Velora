import supabase from "../lib/supabase";

export async function signUpUser(username, email, password) {
  try {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function loginUser(email, password) {
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    return { error };
  }
}

export async function getUserData() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      return null;
    }
    console.log(data);
    return data?.user || null;
     
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateAuthData(obj) {
  try {
    const { data, error } = await supabase.auth.updateUser(obj);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateUserMetaData(obj) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: obj,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
