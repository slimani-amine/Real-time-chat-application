export default function UserLayout({ user }) {

  return (
    <div className="relative flex items-center">
      <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />
      <span className="block ml-2 text-gray-500 dark:text-gray-400">
        {user?.fullName}
      </span>

      <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></span>
    </div>
  );
}
