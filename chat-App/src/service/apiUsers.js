import supabase, { supabaseUrl } from "./supabase";

export async function insertUser({ fullName, userId }) {
  const { data, error } = await supabase
    .from("user_info")
    .insert({ fullName, avatar: "https://shorturl.at/glrOQ", user_id: userId })
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from("user_info").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getUserById(receiverId) {
  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", receiverId);
  if (error) {
    throw new Error(error.message);
  }
  return data; 
}
export async function updateCurrentUserChat({ userId, fullName, avatar }) {
  const { data, error } = await supabase
    .from("user_info")
    .update({ fullName, avatar })
    .eq("user_id", userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
