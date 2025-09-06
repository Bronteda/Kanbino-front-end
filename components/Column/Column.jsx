import { Link } from "react-router";
// ...existing code...
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "../Card/Card";

const Column = ({ column, boardId, handleRemoveColumn, allCards }) => {
  // Filter incomplete cards for this column from allCards
  // Get incomplete card IDs for drag-and-drop
  const incompletedCardIds = column.cardIds.filter((cardId) => {
    const card = allCards.find((c) => c._id === cardId);
    return card && !card.completed;
  });

  return (
    <div
      key={column._id}
      className="bg-[#eaf3fb] border border-[#3C75A6]/20 rounded-2xl shadow flex-shrink-0 min-w-[14rem] max-w-[18rem] px-4 py-3"
    >
      {/* Column header */}
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-lg font-bold text-[#3C75A6] tracking-tight bg-white px-3 py-1 rounded-xl shadow-sm mr-6">
          {column.title}
        </h5>
        <div className="flex items-center gap-3">
          {incompletedCardIds.length === 0 && (
            <button
              onClick={() => handleRemoveColumn(boardId, column._id)}
              className="h-7 w-7 flex items-center justify-center rounded-full bg-[#F36A1B] text-white text-lg font-bold hover:bg-[#3C75A6] transition-colors shadow"
              title="Delete column"
            >
              ×
            </button>
          )}
          <Link to={`/boards/${boardId}/column/${column._id}`}>
            <button className="px-2 py-1 rounded-lg bg-[#3C75A6]/10 text-[#3C75A6] text-xs font-semibold hover:bg-[#3C75A6]/20 transition-colors">
              Edit
            </button>
          </Link>
        </div>
      </div>

      {/* Cards stack with drag-and-drop */}
      <Droppable droppableId={column._id} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4 min-h-[2rem]"
          >
            {incompletedCardIds.length > 0 ? (
              incompletedCardIds.map((cardId, index) => (
                <Draggable key={cardId} draggableId={cardId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded-xl border border-[#3C75A6]/10 shadow p-3 hover:border-[#3C75A6]/30 transition-colors"
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
          className="mt-5 w-full text-left px-4 py-2 rounded-xl bg-[#fff7f2] border-2 border-dashed border-[#F36A1B]/30 text-[#F36A1B] font-semibold hover:border-[#F36A1B] hover:bg-[#F36A1B]/20 hover:text-[#F36A1B] transition-colors text-sm shadow"
        >
          + Add a card
        </button>
      </Link>
    </div>
  );
};

export default Column;
