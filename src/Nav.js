import React from "react";

function Nav({ user, signIn, signOut }) {
  return (
    <>
      <nav className="px-5 h-20 bg-red-200 flex items-center justify-between ">
        {!user ? (
          <h1 className="font-serif text-2xl font-bold">Enter Bookstore</h1>
        ) : (
          /**
           * assign the users first name before bookstore if they are signed in
           */
          <h1 className="font-serif text-2xl font-bold">
            {user.displayName.split(" ")[0]}'s Bookstore
          </h1>
        )}
        {!user ? (
          /**
           * if the user val is null show sign in button
           * otherwise show sign out button
           */
          <button
            onClick={signIn}
            className="bg-green-200 px-5 py-3 font-medium rounded-xl hover:bg-green-300 transition-all"
          >
            Sign In With Google
          </button>
        ) : (
          <button
            onClick={signOut}
            className="bg-green-200 px-5 py-3 font-medium rounded-xl hover:bg-green-300 transition-all"
          >
            Sign Out
          </button>
        )}
      </nav>
    </>
  );
}

export default Nav;
