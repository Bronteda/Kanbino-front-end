import { useState, useEffect } from "react";
import * as boardServices from "../../services/boardServices";
import { useParams } from "react-router";

const BoardForm = ({ createBoard, updateBoard }) => {
  const initialState = {
    title: "",
    dueDate: "",
    startDate: "",
  };
  const { boardId } = useParams();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (boardId) {
        await updateBoard(boardId, formData);
      } else {
        await createBoard(formData);
        setFormData(initialState); // Reset form after creating
      }
    } catch (error) {
      console.error("Error submitting board form:", error);
    }
  };

  useEffect(() => {
    if (boardId) {
      const fetchBoard = async () => {
        const board = await boardServices.getBoardById(boardId);
        if (board) {
          setFormData({
            title: board.currentBoard.title,
            dueDate: board.currentBoard.dueDate
              ? board.currentBoard.dueDate.slice(0, 10)
              : "",
            startDate: board.currentBoard.startDate
              ? board.currentBoard.startDate.slice(0, 10)
              : "",
          });
        }
      };
      fetchBoard();

      return () => setFormData(initialState); // clean up
    }
  }, [boardId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-[#3C75A6] mb-8">
          {boardId ? "Edit Board" : "Create Board"}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Board Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Board Title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#F36A1B] text-white font-semibold rounded-lg shadow hover:bg-[#3C75A6] transition-colors"
          >
            {boardId ? "Update Board" : "Create Board"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
