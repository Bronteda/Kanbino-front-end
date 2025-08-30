import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
import LandingPage from "../components/LandingPage/LandingPage";
import Dashboard from "../components/Dashboard/Dashboard";
import Board from "../components/Board/Board";
import CreateBoardForm from "../components/CreateBoardForm/CreateBoardForm";
import * as boardServices from "../services/boardServices";
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

  const createBoard = async (boardData) => {
    try {
      setLoading(true);
      const newBoard = await boardServices.createBoard(boardData);
      setBoards([...boards, newBoard]);
      console.log(newBoard._id);
      setLoading(false);
      navigate(`/boards/${newBoard._id}`);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

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
            user ? <Dashboard user={user} boards={boards} deleteBoard={deleteBoard}/> : <LandingPage />
          }
        ></Route>
        {user ? (
          <>
            <Route
              path="/boards/:boardId"
              element={<Board boards={boards} />}
            />
            <Route
              path="/boards"
              element={<CreateBoardForm createBoard={createBoard}/>}
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
