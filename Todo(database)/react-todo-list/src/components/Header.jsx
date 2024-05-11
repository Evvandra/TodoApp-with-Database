import Users from "../pages/Users";
import { Link } from "react-router-dom";

export function Header () {
  return (
    <div className="app-container mt-6 mb-6 shadow-xl px-6 py-6 bg-violet-400">
      <header className="flex justify-center my-4 text-white">
        <div>
          <h1 className="uppercase tracking-[.3em] cursor-default select-none text-4xl font-bold">To-Do App</h1>
        </div>
        <Link to="/Users">
          <div className="flex relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ml-auto">
            <svg className="absolute w-12 h-12 text-gray-400 -right-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
        </Link>
      </header>
    </div>

  );
}