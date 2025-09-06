import axios from "axios";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/boards`;

//get all users
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASEURL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    //console.log(response.data);
    return response.data;
  } catch (error) {
    
    console.error("Error fetching users:", error);
    throw new Error(error);
  }
};

const getAllBoards = async () => {
  try {
    const response = await axios.get(BASEURL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      //console.error("Error fetching boards:", response.data.error);
      throw new Error(response.data.error);
    }

    //console.log("Fetched boards:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error fetching boards:", error);
    throw new Error(error);
  }
};

//Board data includes title,start and due date
const createBoard = async (boardData) => {
  try {
    const response = await axios.post(BASEURL, boardData, {
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

const getBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${BASEURL}/${boardId}`, {
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

const updateBoard = async (boardId, boardData) => {
  try {
    const response = await axios.put(`${BASEURL}/${boardId}`, boardData, {
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

const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(`${BASEURL}/${boardId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    //console.error("Error deleting board:", error);
    throw new Error(error);
  }
};

//**Member routes  */


const getBoardMembers = async (boardId) => {
  try {
    const response = await axios.get(`${BASEURL}/${boardId}/members`, {
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

const addMemberToBoard = async (boardId, userId) => {
  try {
    const response = await axios.put(
      `${BASEURL}/${boardId}/members`,
      { userId },
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
    //console.error("Error adding member:", error);
    throw new Error(error);
  }
};

const removeMemberFromBoard = async (boardId, memberId) => {
  try {
    const response = await axios.put(
      `${BASEURL}/${boardId}/member/${memberId}`, { boardId, memberId },
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
    //console.error("Error removing member:", error);
    throw new Error(error);
  }
};

//**Column Routes */
const addColumnToBoard = async (boardId, columnData) => {
  try {
    const response = await axios.post(
      `${BASEURL}/${boardId}/column`,
      columnData,
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

const editColumnInBoard = async (boardId, columnId, columnData) => {
  try {
    const response = await axios.put(
      `${BASEURL}/${boardId}/column/${columnId}`,
      columnData,
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

const reorderColumnsInBoard = async (boardId, orderedColumnIds) => {
  try {
    const response = await axios.put(
      `${BASEURL}/${boardId}/columns/reorder`,
      { orderedColumnIds },
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
    //console.error("Error reordering columns:", error);
    throw new Error(error);
  }
};

const deleteColumnFromBoard = async (boardId, columnId) => {
  try {
    const response = await axios.delete(
      `${BASEURL}/${boardId}/column/${columnId}`,
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

const getUsersOnBoard = async (boardId) => {
  try {
    const response = await axios.get(`${BASEURL}/${boardId}/users`, {
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

const getUserById = async (boardId, userId) => {
  try {
    const response = await axios.get(`${BASEURL}/${boardId}/users/${userId}`, {
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

//**Add a card */
//this is what card data will include
// {
//   boardId: boardId,
//   columnId: columnId,
//   title: req.body.title,
//   description: req.body.description ? req.body.description : "",
//   assignedTo: assigned,
//   position: position
// }
const addCardToColumn = async (boardId, columnId, cardData) => {
  try {
    const response = await axios.post(
      `${BASEURL}/${boardId}/column/${columnId}/card`,
      cardData,
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

const getCardsByBoardId = async (boardId) => {
  try {
    const response = await axios.get(`${BASEURL}/${boardId}/cards`, {
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

export {
  getAllUsers,
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardMembers,
  addMemberToBoard,
  removeMemberFromBoard,
  addColumnToBoard,
  editColumnInBoard,
  reorderColumnsInBoard,
  deleteColumnFromBoard,
  getUsersOnBoard,
  getUserById,
  addCardToColumn,
  getCardsByBoardId,
};
