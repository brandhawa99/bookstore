import React from "react";

function Nav({ user, signin }) {
  return (
    <>
      <nav className="px-5 h-20 bg-red-200 flex items-center justify-between ">
        {!user ? (
          <h1 className="font-serif text-2xl font-bold">Enter Bookstore</h1>
        ) : (
          <h1 className="font-serif text-2xl font-bold">
            {user.displayName.split(" ")[0]}'s Bookstore
          </h1>
        )}
        {!user && (
          <button
            onClick={signin}
            className="bg-green-200 px-5 py-3 font-medium rounded-xl hover:bg-green-300 transition-all"
          >
            Sign In With Google
          </button>
        )}
      </nav>
    </>
  );
}

export default Nav;
