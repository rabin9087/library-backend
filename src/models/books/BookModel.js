import BookSchema from "./BookSchema.js";

//create
export const createBook = (bookObj) => {
    return BookSchema(bookObj).save();
}
export const getAllBooks = () => {
    return BookSchema.find();
}

//read @filter must be an object
export const getBook = (filter) => {
    return BookSchema.findOne(filter);
}

//delete
export const deleteBook = (filter) => {
    return BookSchema.findOneAndDelete(filter);
}