import { useParams } from "react-router";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import * as boardServices from "../../services/boardServices";
import Card from "../Card/Card";

const Board = ({ removeColumn }) => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRemoveColumn = async (boardId, columnId) => {
    try {
      await removeColumn(boardId, columnId);
      const boardData = await boardServices.getBoardById(boardId);
      setBoard(boardData.currentBoard);
    } catch (error) {
      console.error("Error removing column:", error);
    }
  };

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      try {
        const boardData = await boardServices.getBoardById(boardId);
        //console.log(boardData.currentBoard);
        setBoard(boardData.currentBoard);
      } catch (error) {
        setBoard(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [boardId]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <span className="mt-4 text-gray-600">Loading board...</span>
      </div>
    );
  if (!board) return <p className="p-6 text-gray-600">Board not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900">{board.title}</h4>
        <div className="mt-2 text-sm text-gray-600 space-x-4">
          <span>
            <strong>Due Date:</strong>{" "}
            {new Date(board.dueDate).toLocaleDateString()}
          </span>
          <span>
            <strong>Start Date:</strong>{" "}
            {new Date(board.startDate).toLocaleDateString()}
          </span>
        </div>
        <div>
          <Link
            className="text-blue-500 hover:underline"
            to={`/boards/${board._id}/members`}
          >
            Members 🤼‍♂️
          </Link>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {board && Array.isArray(board.columns) && board.columns.length > 0 ? (
          board.columns.map((column) => (
            <div
              key={column._id}
              className="w-80 min-w-[18rem] bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm flex-shrink-0"
            >
              {/* Column */}
              <div className="mb-3">
                <h5 className="text-lg font-semibold text-gray-800">
                  {column.title}
                </h5>
                {/* Remove icon only shows if no cards in column */}
                {column.cardIds.length === 0 && (
                  <button
                    onClick={() => handleRemoveColumn(boardId, column._id)}
                    className="h-4 w-4 flex items-center justify-center bg-[#F36A1B] text-white text-sm font-bold  hover:bg-[#3C75A6] transition-colors"
                  >
                    ×
                  </button>
                )}
                <Link to={`/boards/${board._id}/column/${column._id}`}>
                  <button>Edit Column</button>
                </Link>
              </div>

              {/* Cards stack */}
              <div className="space-y-3">
                {column.cardIds.length > 0 ? (
                  column.cardIds.map((cardId) => (
                    <div
                      key={cardId}
                      className="bg-white rounded-lg border border-gray-200 shadow p-3"
                    >
                      {/* Your existing Card component renders card content */}
                      <Card
                        cardId={cardId}
                        boardId={boardId}
                        columnId={column._id}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No cards yet</p>
                )}
              </div>

              {/* Add card */}
              <Link to={`/boards/${board._id}/column/${column._id}/card`}>
                <button
                  type="button"
                  className="mt-4 w-full text-left px-3 py-2 rounded-lg bg-white border border-dashed border-gray-300 hover:border-[#3C75A6] hover:text-[#3C75A6] transition-colors text-sm"
                >
                  + Add a card
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No columns yet</p>
        )}

        <Link to={`/boards/${board._id}/column`}>
          <button
            type="button"
            className="w-80 min-w-[18rem] h-fit self-start bg-white border-2 border-dashed border-gray-300 rounded-xl p-3 text-left text-gray-500 hover:border-[#3C75A6] hover:text-[#3C75A6] transition-colors"
          >
            + Add a column
          </button>
        </Link>
      </div>
      <div className="mt-8 flex justify-right">
        <Link
          to={`/`}
          className="bg-[#3C75A6] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#F36A1B] transition-colors"
        >
          Back to Board
        </Link>
      </div>
    </div>
  );
};

export default Board;
