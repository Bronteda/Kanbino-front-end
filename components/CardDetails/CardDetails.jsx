import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as cardServices from "../../services/cardServices";
import * as boardServices from "../../services/boardServices";
import Comment from "../Comment/Comment";
import { findUserById } from "../../Utilities/usersHelper";
import CommentForm from "../CommentForm/CommentForm";

const CardDetails = ({ removeCard }) => {
  const { boardId, cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [assignedUser, setAssignedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch card details first
  const fetchCardDetails = async () => {
    setLoading(true);
    try {
      const card = await cardServices.getCardById(cardId);
      setCardDetails(card);
    } catch (error) {
      console.error("Error fetching card details:", error);
    } finally {
      setLoading(false);
    }
  };

  //card details
  useEffect(() => {
    fetchCardDetails();
  }, [cardId]);


  //find assigned person
  useEffect(() => {
    if (!cardDetails?.assignedTo) return;
    const fetchAssignedUser = async () => {
      const assignedUserId = cardDetails?.assignedTo;
      const assignedUserDetails = await findUserById(boardId, assignedUserId);
      setAssignedUser(assignedUserDetails);
    };
    fetchAssignedUser();
  }, [cardDetails, boardId]);

  //delete a card
  const handleDeleteCard = async () => {
    try {
      await removeCard(cardId);
      navigate(`/boards/${boardId}`);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  //add a comment
  const handleAddComment = async (formData) => {
    try {
      const newComment = await cardServices.addCommentToCard(cardId, formData);
      fetchCardDetails();
    } catch (error) {
      console.log(error);
    }
  };
  //delete a comment
  const removeComment = async (commentId) => {
    try {
      await cardServices.deleteCommentFromCard(cardId, commentId);
      fetchCardDetails();
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fbfe] via-white to-[#f7fbfe] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Card Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#e3eaf3] mb-8 relative overflow-hidden">
          {/* Gradient Top Border */}
          <div className="absolute left-0 right-0 top-0 h-3 rounded-t-2xl bg-gradient-to-r from-[#3C75A6] via-[#2BB8A6] to-[#3C75A6] z-10" />
          <div className="relative z-20 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold text-[#3C75A6]">Card Details</h2>
              <div className="flex gap-2">
                <Link to={`/boards/${boardId}/card/${cardId}/edit`}>
                  <button
                    className="inline-flex items-center gap-2 rounded-full bg-[#3C75A6] px-4 py-2 text-white shadow hover:bg-[#335f86] transition-colors"
                    aria-label="Edit Card"
                  >
                    ✏️ <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={handleDeleteCard}
                  className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-red-700 shadow hover:bg-red-200 transition-colors"
                  aria-label="Delete Card"
                >
                  ❌ <span>Delete</span>
                </button>
              </div>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-2/3 rounded bg-gray-200" />
                <div className="h-5 w-1/2 rounded bg-gray-100" />
                <div className="h-16 w-full rounded bg-gray-100" />
              </div>
            ) : cardDetails ? (
              <div className="space-y-6">
                {/* Title & Status */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cardDetails.title}
                  </h3>
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                      cardDetails.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700",
                    ].join(" ")}
                  >
                    {cardDetails.completed ? "Completed" : "In Progress"}
                  </span>
                </div>
                {/* Description */}
                <div>
                  <h4 className="mb-1 text-sm font-medium text-gray-600">
                    Description
                  </h4>
                  <p className="whitespace-pre-wrap rounded-lg border bg-slate-50 p-4 text-base text-gray-800">
                    {cardDetails.description || "—"}
                  </p>
                </div>
                {/* Assigned To */}
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-gray-600">
                    Assigned To:
                  </h4>
                  <span className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-sm text-gray-800">
                    {cardDetails.assignedTo
                      ? userLoading
                        ? "Loading..."
                        : assignedUser?.name || "Unassigned"
                      : "Unassigned"}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">Card not found.</p>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#e3eaf3] mb-8">
          <div className="border-b px-8 py-4">
            <h2 className="text-lg font-semibold text-[#3C75A6]">Comments</h2>
          </div>
          <div className="p-8 space-y-6">
            {cardDetails && cardDetails.comments?.length > 0 ? (
              <ul className="space-y-4">
                {cardDetails.comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    boardId={boardId}
                    cardId={cardId}
                    removeComment={removeComment}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No comments available</p>
            )}
            {/* Add a comment */}
            <div className="rounded-xl border bg-slate-50 p-4">
              <CommentForm handleAddComment={handleAddComment} />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end">
          <Link to={`/boards/${boardId}`}>
            <button className="rounded-md bg-[#3C75A6] px-6 py-2 text-white font-semibold shadow hover:bg-[#335f86] transition-colors">
              Back to Board
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
