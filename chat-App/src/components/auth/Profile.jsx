import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import toast from "react-hot-toast";
import { useUpdateUserChat } from "../../hooks/useUpdateUserChat";
import { useUpdateUser } from "../../hooks/useUpdateUser";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();
  const avatars = [
    "https://shorturl.at/enV05",
    "https://shorturl.at/qtuvL",
    "https://shorturl.at/chntN",
    "https://shorturl.at/ctwM1",
    "https://shorturl.at/ltyO9",
    "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg",
  ];
  const [userName, setUsername] = useState(user?.user_metadata?.fullName);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const { isUpadating, updateUser } = useUpdateUser();
  const { updateUserChat } = useUpdateUserChat();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      userName?.length <= 2 ||
      (user?.user_metadata?.fullName === userName &&
        setSelectedAvatar === undefined)
    ) {
      toast.error("Put a valid name and of course not the same one");
      return;
    }
    const profile = {
      fullName: userName,
      avatar: avatars[selectedAvatar],
      userId: user?.id,
    };
    console.log(profile);
    updateUser(profile, {
      onSettled: (user) => {
        updateUserChat(profile);
      },
    });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? "border-4  border-blue-700 dark:border-blue-700"
                        : "cursor-pointer hover:border-4 hover:border-blue-700",
                      "block object-cover object-center w-36 h-36 rounded-full"
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              defaultValue={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
