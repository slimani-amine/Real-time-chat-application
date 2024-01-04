import supabase, { supabaseUrl } from "./supabase";
export async function getChatRoomById(id) {
  let { data: chat, error } = await supabase
    .from("chat")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return chat;
}
export async function getChatRoom({ senderId, receiverId }) {
  let { data: chat, error } = await supabase
    .from("chat")
    .select("*")
    .eq("sender_id", senderId)
    .eq("reciever_id", receiverId);
  if (error) {
    throw new Error(error.message);
  }
  return chat;
}
export async function getChatRoomBySenderId(senderId) {
  let { data: chat, error } = await supabase
    .from("chat")
    .select("*")
    .eq("sender_id", senderId);
  if (error) {
    throw new Error(error.message);
  }
  return chat;
}
export async function getChatRoomByRecievrId(receiverId) {
  let { data: chat, error } = await supabase
    .from("chat")
    .select("*")
    .eq("reciever_id", receiverId);
  if (error) {
    throw new Error(error.message);
  }
  return chat;
}
export async function createChatRoom({ senderId, receiverId }) {
  const { data, error } = await supabase
    .from("chat")
    .insert({ sender_id: senderId, reciever_id: receiverId })
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
