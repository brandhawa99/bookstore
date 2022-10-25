import React from "react";
import {
  doc,
  deleteDoc,
  getFirestore,
  query,
  collection,
  onSnapshot,
} from "firebase/firestore";
import app from "./firebase-config";
import "./App.css";
function Book({ title, author, status, id, user, getBooks }) {
  const db = getFirestore(app);
  const q = query(collection(db, user.uid));
  let unsub;
  const updateBook = async () => {};

  const deleteBook = async () => {
    try {
      const docRef = doc(db, user.uid, id);
      await deleteDoc(docRef);
      // unsub = onSnapshot(q, (snapshot) => {
      //   snapshot.docChanges().forEach((change) => {
      //     if (change.type === "added") {
      //     }
      //     if (change.type === "removed") {
      //       getBooks();
      //     }
      //     if (change.type === "modified") {
      //       getBooks();
      //     }
      //   });
      // });
    } catch (error) {
      console.log(error);
    } finally {
      // unsub();
    }
  };

  return status ? (
    /**
     * if the books status is not read make it read
     * if the status is read then make it green
     * and assign the title and the author vals
     * TODO: make the x button delete the book from the database and refresh the
     * page to fetch the remaining books.
     *
     */
    <div className="overflow-y-scroll gap-3 flex flex-col border-8 items-center border-green-500 h-64 bg-white w-56 rounded-lg px-3 py-5">
      <button
        onClick={deleteBook}
        className=" self-start text-red-600 py-1 px-2 my-1 bg-white rounded-lg hover:bg-red-300 transition-all"
      >
        &#10005;
      </button>
      <div className="font-bold text-center">{title}</div>
      <div className="text-center">{author}</div>
      <button className="font-semibold bg-green-300 py-1 w-full hover:bg-green-400">
        Finished
      </button>
    </div>
  ) : (
    <div className="overflow-y-scroll gap-3 flex flex-col border-8 items-center border-red-500 h-64 bg-white w-56 rounded-lg px-3 py-5">
      <button
        onClick={deleteBook}
        className=" self-start text-red-600 py-1 px-2 my-1 bg-white rounded-lg hover:bg-red-300 transition-all"
      >
        &#10005;
      </button>
      <div className="font-bold">{title}</div>
      <div>{author}</div>
      <button className="font-semibold bg-red-300 py-1 w-full hover:bg-red-400">
        Not Finished
      </button>
    </div>
  );
}

export default Book;
