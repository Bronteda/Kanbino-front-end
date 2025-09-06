import { useParams } from "react-router";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import * as boardServices from "../../services/boardServices";
import * as cardServices from "../../services/cardServices";
import Column from "../Column/Column";
import { DragDropContext } from "@hello-pangea/dnd";

const Board = ({ removeColumn }) => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCards, setAllCards] = useState([]);

  const handleRemoveColumn = async (boardId, columnId) => {
    try {
      // Re-fetch board before attempting to delete column
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
        //console.log(boardData);
        const cardsData = await boardServices.getCardsByBoardId(boardId);
        setAllCards(cardsData.cards || []);
        setBoard({
          ...boardData.currentBoard,
        });
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

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // Dropped outside a droppable area , meaning outside our columns

    //dropped in the same place - do nothing
    //check both column from and to same and that place in column same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //find source and destiantion columns
    const sourceColumnIdx = board.columns.findIndex(
      (column) => column._id === source.droppableId
    );
    const destinationColumnIdx = board.columns.findIndex(
      (column) => column._id === destination.droppableId
    );
    if (sourceColumnIdx === -1 || destinationColumnIdx === -1) return;

    //copy columns
    const newColumns = board.columns.map((column) => ({
      ...column,
      cardIds: [...column.cardIds],
    }));
    //remove card from source
    const cardId = newColumns[sourceColumnIdx].cardIds[source.index];
    newColumns[sourceColumnIdx].cardIds.splice(source.index, 1);
    //insert card into destination
    newColumns[destinationColumnIdx].cardIds.splice(
      destination.index,
      0,
      cardId
    );

    //update the board state
    setBoard({ ...board, columns: newColumns });

    try {
      await cardServices.moveCard(
        cardId,
        source.droppableId,
        destination.droppableId,
        destination.index
      );
    } catch (error) {
      console.error("Failed to move card:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
          {/* Board Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 p-6 rounded-2xl shadow bg-white border border-[#3C75A6]/20">
            <div>
              <h1 className="text-3xl font-extrabold text-[#3C75A6] tracking-tight mb-2 drop-shadow">
                {board.title}
              </h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf3fb] px-3 py-1 border border-[#3C75A6]/10">
                  <strong className="font-semibold text-[#3C75A6]">Due:</strong>
                  {board.dueDate
                    ? new Date(board.dueDate).toLocaleDateString()
                    : "No due date"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#fff7f2] px-3 py-1 border border-[#F36A1B]/10">
                  <strong className="font-semibold text-[#F36A1B]">
                    Start:
                  </strong>
                  {board.startDate
                    ? new Date(board.startDate).toLocaleDateString()
                    : "No start date"}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#3C75A6]/30 bg-[#eaf3fb] px-4 py-2 text-sm font-semibold text-[#3C75A6] shadow hover:border-[#3C75A6] hover:bg-[#3C75A6]/20 transition-colors"
                to={`/boards/${board._id}/members`}
              >
                <span>Members</span> <span>🤼‍♂️</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#F36A1B]/30 bg-[#fff7f2] px-4 py-2 text-sm font-semibold text-[#F36A1B] shadow hover:border-[#F36A1B] hover:bg-[#F36A1B]/20 transition-colors"
                to={`/boards/${board._id}/completed`}
              >
                <span>Completed Cards</span> <span>✔️</span>
              </Link>
            </div>
          </div>

          {/* Columns Area */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative">
              <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-[#3C75A6]/40 scrollbar-track-[#eaf3fb]">
                {board &&
                Array.isArray(board.columns) &&
                board.columns.length > 0 ? (
                  board.columns.map((column) => (
                    <div
                      key={column._id}
                      className="min-w-[14rem] max-w-[18rem] bg-[#eaf3fb] border border-[#3C75A6]/10 rounded-2xl shadow-sm"
                    >
                      <Column
                        column={column}
                        boardId={boardId}
                        handleRemoveColumn={handleRemoveColumn}
                        allCards={allCards}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-base italic text-gray-400 mt-8">
                    No columns yet
                  </p>
                )}

                {/* Add Column Button */}
                <Link to={`/boards/${board._id}/column`}>
                  <button
                    type="button"
                    className="min-w-[14rem] max-w-[18rem] h-fit self-start rounded-2xl border-2 border-dashed border-[#F36A1B]/30 bg-[#fff7f2] p-4 text-left text-[#F36A1B] font-semibold transition-colors hover:border-[#F36A1B] hover:bg-[#F36A1B]/20 shadow"
                  >
                    + Add a column
                  </button>
                </Link>
              </div>
            </div>
          </DragDropContext>

          {/* Back Button */}
          <div className="mt-10 flex justify-end">
            <Link
              to={`/`}
              className="rounded-full bg-[#3C75A6] px-8 py-3 font-bold text-white shadow-lg hover:bg-[#F36A1B] transition-colors text-lg"
            >
              Back to Board
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
