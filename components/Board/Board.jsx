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
      <div className="min-h-screen bg-slate-50/60">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="sticky top-0 z-10 -mx-6 mb-6 border-b border-gray-100 bg-white/70 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h4 className="text-2xl font-bold text-gray-900">{board.title}</h4>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                <strong className="font-semibold text-gray-700">Due</strong>
                {board.dueDate ? new Date(board.dueDate).toLocaleDateString() : "No due date"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                <strong className="font-semibold text-gray-700">Start</strong>
                {board.startDate ? new Date(board.startDate).toLocaleDateString() : "No start date"}
              </span>

              <Link
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#3C75A6]/20 bg-white px-3 py-1.5 text-sm font-medium text-[#3C75A6] shadow-sm hover:border-[#3C75A6] hover:bg-[#3C75A6]/5"
                to={`/boards/${board._id}/members`}
              >
                Members 🤼‍♂️
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#3C75A6]/20 bg-white px-3 py-1.5 text-sm font-medium text-[#3C75A6] shadow-sm hover:border-[#3C75A6] hover:bg-[#3C75A6]/5"
                to={`/boards/${board._id}/completed`}
              >
                Completed Cards ✔️
              </Link>
            </div>
          </div>

          {/* DragDropContext should wrap all columns, not each column */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative">

              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2">
                {board &&
                Array.isArray(board.columns) &&
                board.columns.length > 0 ? (
                  board.columns.map((column) => (
                    <div
                      key={column._id}
                      className="min-w-[12rem] max-w-[16rem]"
                    >
                      <Column
                        column={column}
                        boardId={boardId}
                        handleRemoveColumn={handleRemoveColumn}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400">No columns yet</p>
                )}

                <Link to={`/boards/${board._id}/column`}>
                  <button
                    type="button"
                    className="w-48 min-w-[12rem] h-fit self-start rounded-xl border-2 border-dashed border-gray-300 bg-white p-2 text-left text-gray-500 transition-colors hover:border-[#3C75A6] hover:text-[#3C75A6] shadow-sm"
                  >
                    + Add a column
                  </button>
                </Link>
              </div>
            </div>
          </DragDropContext>

          <div className="mt-8 flex justify-end">
            <Link
              to={`/`}
              className="rounded-full bg-[#3C75A6] px-6 py-2 font-semibold text-white shadow hover:bg-[#F36A1B] transition-colors"
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
