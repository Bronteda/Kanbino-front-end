import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as cardService from "../../services/cardServices";

const CommentForm = ({ handleAddComment }) => {
  const { boardId, cardId, commentId } = useParams();
  const navigate = useNavigate();
  const initalState = { text: "" };
  const [formData, setFormData] = useState(initalState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentId) {
      // Update existing comment
      await cardService.editCommentInCard(cardId, commentId, formData);
      navigate(`/boards/${boardId}/card/${cardId}`);
    } else {
      // Add new comment
      handleAddComment(formData);
    }
    console.log(formData);
    setFormData(initalState);
  };

  if (commentId) {
    // Fetch the existing comment data and populate the form
    useEffect(() => {
      const fetchCommentData = async () => {
        const commentData = await cardService.getCommentById(cardId, commentId);
        console.log(commentData.comment);
        setFormData({ text: commentData.comment.text });
      };
      fetchCommentData();
    }, [commentId]);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <label
        htmlFor="text-input"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Comment:
      </label>

      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="Add a comment..."
        className="w-full min-h-[6rem] resize-y rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#3C75A6] focus:ring-2 focus:ring-[#3C75A6]"
      />

      <button
        type="submit"
        className="mt-3 inline-flex items-center rounded-lg bg-[#3C75A6] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#F36A1B] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#3C75A6]"
      >
        {commentId ? "Update Comment" : "Add Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
