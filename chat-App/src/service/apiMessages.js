import supabase, { supabaseUrl } from "./supabase";
export async function getMessageByChatRoom(chatId) {
  let { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId);
  if (error) {
    throw new Error(error.message);
  }

  return messages;
}

