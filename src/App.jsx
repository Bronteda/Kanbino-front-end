import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import LandingPage from "../components/LandingPage/LandingPage";
import Dashboard from "../components/Dashboard/Dashboard";
import Board from "../components/Board/Board";
import BoardForm from "../components/BoardForm/BoardForm";
import CompletedCardsList from "../components/CompletedCardsList/CompletedCardsList";
import ColumnForm from "../components/ColumnForm/ColumnForm";
import CardForm from "../components/CardForm/CardForm";
import CardDetails from "../components/CardDetails/CardDetails";
import CommentForm from "../components/CommentForm/CommentForm";
import MembersList from "../components/MemberList/MemberList";
import * as boardServices from "../services/boardServices";
import * as cardServices from "../services/cardServices";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./App.css";

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBoardData = async () => {
    try {
      const allBoards = await boardServices.getAllBoards();
      setBoards(allBoards.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  //create board
  const createBoard = async (boardData) => {
    try {
      setLoading(true);
      const newBoard = await boardServices.createBoard(boardData);
      setBoards([...boards, newBoard]);
      setLoading(false);
      console.log(newBoard._id);
      navigate(`/`);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  const updateBoard = async (boardId, boardData) => {
    try {
      setLoading(true);
      const updatedBoard = await boardServices.updateBoard(boardId, boardData);
      setBoards(
        boards.map((board) => (board._id === boardId ? updatedBoard : board))
      );
      setLoading(false);
      navigate(`/boards/${boardId}`);
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  //delete board
  const deleteBoard = async (boardId) => {
    try {
      setLoading(true);
      await boardServices.deleteBoard(boardId);
      setBoards(boards.filter((board) => board._id !== boardId));
      setLoading(false);
      navigate("/boards");
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  //create column
  const createColumn = async (boardId, columnData) => {
    try {
      setLoading(true);
      const newColumn = await boardServices.addColumnToBoard(
        boardId,
        columnData
      );
      //console.log(newColumn);
      setLoading(false);
      navigate(`/boards/${boardId}`);
    } catch (error) {
      console.error("Error creating column:", error);
    }
  };

  //update column
  const updateColumn = async (boardId, columnId, columnData) => {
    try {
      setLoading(true);
      const updatedColumn = await boardServices.editColumnInBoard(
        boardId,
        columnId,
        columnData
      );
      setLoading(false);
      navigate(`/boards/${boardId}`);
    } catch (error) {
      console.error("Error updating column:", error);
    }
  };

  const removeColumn = async (boardId, columnId) => {
    try {
      setLoading(true);
      await boardServices.deleteColumnFromBoard(boardId, columnId);
      setLoading(false);
    } catch (error) {
      console.error("Error removing column:", error);
    }
  };

  //add card to column
  const addCardToColumn = async (boardId, columnId, cardData) => {
    try {
      setLoading(true);
      const newCard = await boardServices.addCardToColumn(
        boardId,
        columnId,
        cardData
      );
      setLoading(false);
      navigate(`/boards/${boardId}`);
    } catch (error) {
      console.error("Error adding card to column:", error);
    }
  };

  //edit card
  const editCard = async (cardId, cardData) => {
    try {
      setLoading(true);
      const updatedCard = await cardServices.editCard(cardId, cardData);
      console.log(updatedCard);
      setLoading(false);
      navigate(`/boards/${updatedCard.boardId}`);
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  //remove card
  const removeCard = async (cardId) => {
    try {
      setLoading(true);
      await cardServices.deleteCard(cardId);
      setLoading(false);
      navigate("/boards");
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllBoardData();
    }
  }, [user, loading]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard
                user={user}
                boards={boards}
                deleteBoard={deleteBoard}
              />
            ) : (
              <LandingPage />
            )
          }
        ></Route>
        {user ? (
          <>
            {/* show page for board */}
            <Route
              path="/boards/:boardId"
              element={<Board boards={boards} removeColumn={removeColumn} />}
            />
            {/* create new board */}
            <Route
              path="/boards"
              element={<BoardForm createBoard={createBoard} />}
            />
            {/* Show completed cards */}
            <Route
              path="/boards/:boardId/completed"
              element={<CompletedCardsList />}
            />
            {/* Show board members */}
            <Route
              path="/boards/:boardId/members"
              element={<MembersList boards={boards} />}
            />
            {/*edit Board details*/}
            <Route
              path="/boards/:boardId/edit"
              element={<BoardForm updateBoard={updateBoard} />}
            />
            {/* Add column to board */}
            <Route
              path="/boards/:boardId/column"
              element={<ColumnForm createColumn={createColumn} />}
            />
            {/* Edit column */}
            <Route
              path="/boards/:boardId/column/:columnId"
              element={
                <ColumnForm updateColumn={updateColumn} boards={boards} />
              }
            />
            {/* Add card to column */}
            <Route
              path="/boards/:boardId/column/:columnId/card"
              element={<CardForm addCardToColumn={addCardToColumn} />}
            />
            {/* Show card details */}
            <Route
              path="/boards/:boardId/card/:cardId"
              element={<CardDetails removeCard={removeCard} />}
            />
            {/* Edit card details */}
            <Route
              path="/boards/:boardId/card/:cardId/edit"
              element={<CardForm editCard={editCard} />}
            />
            {/* Edit comment */}
            <Route
              path="/boards/:boardId/card/:cardId/comment/:commentId/edit"
              element={<CommentForm />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<h1>Welcome</h1>} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
