import { useParams } from "react-router";
import Card from "../Card/Card";

const Board = ({ boards }) => {
  const { boardId } = useParams();
  const board = boards.find((b) => b._id === boardId);

  if (!board) return <p className="p-6 text-gray-600">Board not found</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900">{board.title}</h4>
        <div className="mt-2 text-sm text-gray-600 space-x-4">
          <span>
            <strong>Due Date:</strong> {new Date(board.dueDate).toLocaleDateString()}
          </span>
          <span>
            <strong>Start Date:</strong> {new Date(board.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.columns.map((column) => (
          <div
            key={column._id}
            className="w-80 min-w-[18rem] bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm flex-shrink-0"
          >
            {/* Column header */}
            <div className="mb-3">
              <h5 className="text-lg font-semibold text-gray-800">{column.title}</h5>
              {column.description && (
                <p className="text-sm text-gray-500">{column.description}</p>
              )}
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
                    <Card cardId={cardId} />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No cards yet</p>
              )}
            </div>

            {/* Add card placeholder (wire only) */}
            <button
              type="button"
              className="mt-4 w-full text-left px-3 py-2 rounded-lg bg-white border border-dashed border-gray-300 hover:border-[#3C75A6] hover:text-[#3C75A6] transition-colors text-sm"
              // onClick={() => openNewCardModal(column._id)}
            >
              + Add a card
            </button>
          </div>
        ))}

        {/* Optional: “Add Column” stub */}
        <button
          type="button"
          className="w-80 min-w-[18rem] h-fit self-start bg-white border-2 border-dashed border-gray-300 rounded-xl p-3 text-left text-gray-500 hover:border-[#3C75A6] hover:text-[#3C75A6] transition-colors"
          // onClick={openNewColumnModal}
        >
          + Add a column
        </button>
      </div>
    </div>
  );
};

export default Board;

