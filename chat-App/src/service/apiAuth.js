import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut({});
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData = { data: { fullName, avatar } };
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (avatar) return data;
}
