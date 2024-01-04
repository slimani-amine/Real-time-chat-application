import supabase from "./supabase";
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

export async function createMessage({ sender_id, chat_id, message }) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ sender_id: sender_id, chat_id, message })
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
