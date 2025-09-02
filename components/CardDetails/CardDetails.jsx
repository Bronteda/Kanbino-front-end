import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as cardServices from "../../services/cardServices";
import * as boardServices from "../../services/boardServices";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

const CardDetails = ({ removeCard }) => {
  const { boardId, cardId } = useParams();
  const [cardDetails, setCardDetails] = useState(null);
  const [assignedUser, setAssignedUser] = useState(null);
  const [completed, setCompleted] = useState(false);
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
    // Only fetch assigned user after card details are loaded
    const assignedUserId = cardDetails?.assignedTo;
    if (cardDetails && assignedUserId) {
      setUserLoading(true);
      boardServices
        .getUsersOnBoard(boardId)
        .then((allUsersOnBoard) => {
          const userDetails = allUsersOnBoard.find(
            (user) => user._id === assignedUserId
          );
          setAssignedUser(userDetails);
        })
        .catch((error) => {
          console.error("Error fetching assigned user:", error);
        })
        .finally(() => {
          setUserLoading(false);
        });
    } else {
      setAssignedUser(null);
    }
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
  //edit a comment
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
    <>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/*Card Details*/}
          <section className="md:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3C75A6] via-[#2BB8A6] to-[#3C75A6]" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#3C75A6] via-[#2BB8A6] to-[#3C75A6]" />

              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#3C75A6]">
                    Card Details
                  </h2>
                  <Link to={`/boards/${boardId}/card/${cardId}/edit`}>
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-[#3C75A6] px-4 py-2 text-white shadow hover:bg-[#335f86] transition-colors"
                      aria-label="Edit Card"
                    >
                      ✏️ <span>Edit Card</span>
                    </button>
                  </Link>
                  <button onClick={handleDeleteCard}>❌</button>
                </div>

                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 rounded bg-gray-100" />
                    <div className="h-4 w-5/6 rounded bg-gray-100" />
                  </div>
                ) : cardDetails ? (
                  <div className="space-y-5">
                    {/* Title */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {cardDetails.title}
                      </h3>
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                          completed
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700",
                        ].join(" ")}
                      >
                        {completed ? "Completed" : "In Progress"}
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-gray-600">
                        Description
                      </h4>
                      <p className="whitespace-pre-wrap rounded-lg border bg-slate-50 p-3 text-sm text-gray-800">
                        {cardDetails.description || "—"}
                      </p>
                    </div>

                    {/* Assigned To */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-600">
                        Assigned To
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
          </section>

          {/* Comments */}
          <aside className="md:col-span-1">
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-5 py-3">
                <h2 className="text-base font-semibold text-gray-900">
                  Comments
                </h2>
              </div>

              <div className="p-5 space-y-4">
                {cardDetails && cardDetails.comments?.length > 0 ? (
                  <ul className="space-y-3">
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
                <div className="rounded-xl border bg-white p-3">
                  <CommentForm handleAddComment={handleAddComment} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
