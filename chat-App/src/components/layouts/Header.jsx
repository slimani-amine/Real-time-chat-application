import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggler from "../../ui/ThemeToggler";
import { HiOutlineLogout } from "react-icons/hi";
import { useUser } from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";

export default function Header() {
  const { logout, isLoading: isLogout } = useLogout();
  const { isLoading, isAuthenticated ,user } = useUser();
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      <nav className="px- px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200  text-gray-900 text-sm rounded border dark:bg-gray-800 dark:border-gray-700 dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex">
            <span className="self-center text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
              Chat App
            </span>
          </Link>
          <div className="flex md:order-2">
            <ThemeToggler />
            {isAuth ? (
              <>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={logout}
                  disabled={isLogout}
                >
                  <HiOutlineLogout className="h-8 w-8" aria-hidden="true" />
                </button>
                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.user_metadata?.avatar ? user?.user_metadata?.avatar :"https://shorturl.at/glrOQ"}
                    alt="user avatar"
                  />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
