import { Link } from "react-router";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";

const Column = ({ column, boardId, handleRemoveColumn }) => {
  return (
    <div
      key={column._id}
      className="w-80 min-w-[18rem] bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm flex-shrink-0"
    >
      {/* Column header */}
      <div className="mb-3">
        <h5 className="text-lg font-semibold text-gray-800">{column.title}</h5>
        {column.cardIds.length === 0 && (
          <button
            onClick={() => handleRemoveColumn(boardId, column._id)}
            className="h-4 w-4 flex items-center justify-center bg-[#F36A1B] text-white text-sm font-bold hover:bg-[#3C75A6] transition-colors"
          >
            ×
          </button>
        )}
        <Link to={`/boards/${boardId}/column/${column._id}`}>
          <button>Edit Column</button>
        </Link>
      </div>

      {/* Cards stack with drag-and-drop */}
      <Droppable droppableId={column._id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {column.cardIds.length > 0 ? (
              column.cardIds.map((cardId, index) => (
                <Draggable key={cardId} draggableId={cardId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded-lg border border-gray-200 shadow p-3"
                    >
                      <Card
                        cardId={cardId}
                        boardId={boardId}
                        columnId={column._id}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No cards yet</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add card button */}
      <Link to={`/boards/${boardId}/column/${column._id}/card`}>
        <button
          type="button"
          className="mt-4 w-full text-left px-3 py-2 rounded-lg bg-white border border-dashed border-gray-300 hover:border-[#3C75A6] hover:text-[#3C75A6] transition-colors text-sm"
        >
          + Add a card
        </button>
      </Link>
    </div>
  );
};

export default Column;
