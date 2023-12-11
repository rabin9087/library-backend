import BookSchema from "./BookSchema.js";

//create
export const createBook = (bookObj) => {
    return BookSchema(bookObj).save();
}
export const getAllBooks = () => {
    return BookSchema.find();
}

//read @filter must be an object
export const getABook = (filter) => {
    return BookSchema.findOne(filter);
}

export const getBookById = (_id) => {
    return BookSchema.findById(_id);
}

export const updateBookById = ({_id, ...rest}) => {
    return BookSchema.findByIdAndUpdate(_id, rest);
}

//delete
export const deleteBook = (_id) => {
    return BookSchema.findByIdAndDelete(_id);
}