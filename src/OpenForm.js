import React from "react";
import { toggle } from "./openFormSlice";
import { useDispatch } from "react-redux";
function OpenForm({ user }) {
  const dispatch = useDispatch();
  return (
    <>
      {/**
       * if the user is signed in display the create book button
       * TODO: could have it always present and if the user
       * is not signed it, it will prompt user to sign up
       */}
      {user && (
        <div
          aria-label="Open form"
          onClick={() => dispatch(toggle())}
          className="flex flex-col border-8 items-center justify-center border-gray-500 h-64 bg-gray-200 hover:bg-gray-400 transition-all w-56 rounded-lg text-8xl cursor-pointer"
        >
          <div>&#43;</div>
          <div className="text-sm">Add Book</div>
        </div>
      )}
    </>
  );
}

export default OpenForm;
