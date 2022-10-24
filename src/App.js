import "./App.css";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import React from "react";
import app from "./firebase-config";
import Nav from "./Nav";
import Form from "./Form";
import Library from "./Library";

function App() {
  const [user, setUser] = useState(null);
  const [books, setBook] = useState(null);
  const [newBook, setNewBook] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  /**
   * retrieves all books from user collection
   */
  const getBooks = async () => {
    try {
      const q = query(collection(db, user.uid));
      const querySnapshot = await getDocs(q);
      setBook(querySnapshot);
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setBook(arr);
      console.log(books);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * if user is signedin sets the userstate as the user
   * else set user state and books as null
   */
  onAuthStateChanged(auth, (acc) => {
    if (acc) {
      setUser(acc);
      // ...
    } else {
      setUser(null);
      setBook(null);
    }
  });

  /**
   * sign in the user with google auth popup
   */
  const signIn = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
      const credential = await GoogleAuthProvider.credentialFromResult(result);
      await credential.accessToken;
      const account = result.user;
      setUser(account);
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };

  /**
   * sign out the user
   */
  const sign_Out = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("there was an error signing out", error);
    }
  };

  /**
   * when the user state is changed
   * retrieve books from firestore database
   */
  useEffect(() => {
    getBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="bg-white min-h-screen">
      <Nav user={user} signIn={signIn} signOut={sign_Out} />
      <Form user={user} />
      <Library books={books} />
    </div>
  );
}

export default App;
