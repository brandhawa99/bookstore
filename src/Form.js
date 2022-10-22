import React, { useState } from "react";
import app from "./firebase-config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

function Form() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthour, setBookAuthor] = useState("");
  const [bookRead, setBookRead] = useState(false);

  const db = getFirestore(app);
  return (
    <>
      <form className="bg-teal-400 flex flex-col gap-4 py-3 items-center">
        <div className="flex justify-center">
          <label>Completed:</label>
          <input type="checkbox" name="read" value={bookRead} />
        </div>
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
    </>
  );
}

export default Form;
