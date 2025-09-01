const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cards`;
import axios from "axios";

const getAllCards = async () => {
  try {
    const response = await axios.get(BASEURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const getCardById = async (cardId) => {
  try {
    const response = await axios.get(`${BASEURL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    //console.log("Card details:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const moveCard = async (cardId, fromColumnId, toColumnId, toIndex) => {
  try {
    const response = await axios.put(
      `${BASEURL}/move`,
      { cardId, fromColumnId, toColumnId, toIndex },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const editCard = async (cardId, cardData) => {
  try {
    const response = await axios.put(`${BASEURL}/${cardId}`, cardData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`${BASEURL}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

//**Comments */

//don't need this because card is got all thise details already
// const getCommentsForCard = async (cardId) => {
//   try {
//     const response = await axios.get(`${BASEURL}/${cardId}/comments`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     if (response.data.error) {
//       throw new Error(response.data.error);
//     }

//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const addCommentToCard = async (cardId, commentData) => {
  try {
    const response = await axios.post(
      `${BASEURL}/${cardId}/comments`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


//get comment by id 
const getCommentById = async (cardId , commentId) => {
  try {
    const response = await axios.get(
      `${BASEURL}/${cardId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const editCommentInCard = async (cardId, commentId, commentData) => {
  try {
    const response = await axios.put(
      `${BASEURL}/${cardId}/comments/${commentId}`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCommentFromCard = async (cardId, commentId) => {
  try {
    const response = await axios.delete(
      `${BASEURL}/${cardId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAllCards,
  getCardById,
  moveCard,
  editCard,
  deleteCard,
  addCommentToCard,
  getCommentById,
  editCommentInCard,
  deleteCommentFromCard,
};
