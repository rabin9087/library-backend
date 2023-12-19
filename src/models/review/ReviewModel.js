import ReviewSchema from "./ReviewSchema.js";


//create
export const createReview = (reviewObj) => {
    return ReviewSchema(reviewObj).save();
}

//read @filter must be an object
// export const getAReview = (filter) => {
//     return ReviewSchema.findOne(filter);
// }

//get many review as an array
export const getManyReview = (filter) => {
    return ReviewSchema.find(filter);
}

//update
export const updateReview = (filter, update) => {
    return ReviewSchema.findOneAndUpdate(filter, update);
}

//delete
export const deleteReview = (filter) => {
    return ReviewSchema.findOneAndDelete(filter);
}