import { useState } from "react";
import { HiPaperAirplane as PaperAirplaneIcon } from "react-icons/hi2";
import { IoMdHappy as EmojiHappyIcon } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (event) => {
    let newMessage = message + event.emoji;
    setMessage(newMessage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.handleFormSubmit(message);
    setMessage("");
  };

  return (
    <div className=" z-9999">
      {showEmojiPicker && (
        <Picker
          className="dark:bg-gray-900 "
          onEmojiClick={(event) => handleEmojiClick(event)}
          style={{ position: "absolute", top: "165px" }}
        />
      )}
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiHappyIcon
              className="h-7 w-7 text-blue-600 dark:text-blue-500 "
              aria-hidden="true"
            />
          </div>

          <input
            type="text"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-blue-600 dark:text-blue-500 "
              aria-hidden="true"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
