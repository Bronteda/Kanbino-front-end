import { useEffect, useState } from "react";
import { Link } from "react-router";
import * as boardServices from "../../services/boardServices";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import CommentForm from "../CommentForm/CommentForm";

const Comment = ({ comment, boardId, cardId, removeComment }) => {
  const [author, setAuthor] = useState(null);
  const { user } = useContext(UserContext);
  //console.log(comment.author);
  const userId = comment.author;

  const findUserById = async (boardId, userId) => {
    try {
      const userDetails = await boardServices.getUserById(boardId, userId);
      //console.log("user",userDetails);
      return userDetails;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      const authorDetails = await findUserById(boardId, userId);
      setAuthor(authorDetails);
    };

    fetchAuthor();
  }, [boardId, userId]);

  return (
    <>
      <ul className="space-y-3">
        <li
          key={comment._id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm text-gray-900 whitespace-pre-wrap">
            {comment.text}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            By: {author ? author.name : "Unknown"}
          </p>

          {author
            ? author._id === user._id && (
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    to={`/boards/${boardId}/card/${cardId}/comment/${comment._id}/edit`}
                  >
                    <button className="rounded-md px-3 py-1.5 text-xs font-medium text-[#3C75A6] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#3C75A6]">
                      Edit comment
                    </button>
                  </Link>

                  <button
                    onClick={() => removeComment(comment._id)}
                    className="rounded-md px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                  >
                    Delete comment
                  </button>
                </div>
              )
            : null}
        </li>
      </ul>
    </>
  );
};
export default Comment;
