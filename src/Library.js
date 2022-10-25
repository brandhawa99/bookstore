import Book from "./Book";
import OpenForm from "./OpenForm";
function Library({ books, user, getBooks }) {
  return (
    <>
      <div className="flex flex-wrap gap-5 mx-3 my-5 justify-center">
        {/**
         * TODO: if button is pressed open the bookform
         * on submit or click on the black part closes the form
         * click on x closes the form
         */}
        <OpenForm user={user} />
        {books &&
          books.map((book, index) => {
            console.log(book);
            return (
              <Book
                getBooks={getBooks}
                user={user}
                key={index}
                title={book.title}
                author={book.author}
                status={book.read}
                id={book.id}
              />
            );
          })}
      </div>
    </>
  );
}

export default Library;
