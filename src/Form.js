import React, { useState } from "react";
import app from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./openFormSlice";
function Form({ user }) {
  /**
   * used to store the values of the inputs
   */
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthour, setBookAuthor] = useState("");
  const [bookRead, setBookRead] = useState(false);
  const db = getFirestore(app);
  const open = useSelector((state) => state.openForm.value);
  const dispatch = useDispatch();
  /**
   * on submit get the data from the form and use it to create a doc
   * and submit it to the database
   * then reset the values in held in the bookTitle bookAuthor bookRead state
   * TODO: add a timestamp for when the book was created
   * so that we can sort by time
   */
  const addBook = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, user.uid), {
        title: bookTitle,
        author: bookAuthour,
        read: bookRead,
        timestamp: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
      setBookTitle("");
      setBookAuthor("");
      setBookRead(false);
      dispatch(toggle());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    open && (
      /**
       * if open is ture display the form
       * otherwise go into hiding
       */
      <div className="modalbg absolute h-5/6 w-screen flex justify-center items-center ">
        <form
          onSubmit={(e) => {
            addBook(e);
          }}
          className={
            user
              ? ` rounded-2xl absolute bg-teal-400 flex flex-col gap-4 py-12 px-12 items-center justify-center`
              : "hidden"
          }
        >
          <div
            onClick={() => dispatch(toggle())}
            className="w-100 flex self-start cursor-pointer hover:bg-red-400 px-2 py-1 rounded text-red-600"
          >
            &#10005;
          </div>
          <label className="inline-flex relative items-center cursor-pointer">
            {/**
             * Input for read status of the book
             */}
            <input
              type="checkbox"
              value={bookRead}
              name="bookread"
              id="default-toggle"
              onClick={() => {
                setBookRead(!bookRead);
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Completed
            </span>
          </label>
          {/**
           * Input for title of book
           */}
          <div className="flex justify-center">
            <input
              placeholder={"Title"}
              className="px-2 rounded"
              type={"text"}
              name="title"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </div>
          {/**
           * input for author of book
           */}
          <div className="flex justify-center">
            <input
              className="px-2 rounded"
              placeholder="Author"
              type={"text"}
              required
              name="author"
              onChange={(e) => setBookAuthor(e.target.value)}
              value={bookAuthour}
            />
          </div>

          <button
            className="w-20 bg-green-200 hover:bg-green-300 transition-all rounded-lg"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    )
  );
}

export default Form;
