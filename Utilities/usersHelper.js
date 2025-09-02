import * as boardServices from "../services/boardServices";


// const findUserById = async (boardId, userId) => {
//   try {
//     const userDetails = await boardServices.getUserById(boardId, userId);
//     console.log("user",userDetails);
//     return userDetails;
//   } catch (error) {
//     console.error("Error fetching user by ID:", error);
//     throw error;
//   }
// };


export { findUserById };