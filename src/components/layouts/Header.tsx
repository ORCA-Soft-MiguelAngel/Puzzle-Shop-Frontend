import { useFetchData } from "@/api/apiQueries";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = () => {
  const { logout, isAuthenticated, decodedToken } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-gray-200 text-2xl font-semibold">
                Puzzle Shop
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? (
              <>
                <div className="mr-3 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {decodedToken?.username[0].toUpperCase()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Logout</span>
                  <ArrowLeftOnRectangleIcon
                    className="h-7 w-7"
                    aria-hidden="true"
                  />
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="w-full font-semibold py-2 px-8 border rounded-md flex justify-center relative items-center bg-gray-200 hover:bg-gray-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
