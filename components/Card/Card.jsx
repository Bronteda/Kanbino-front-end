import * as boardServices from "../../services/boardServices";
import * as cardServices from "../../services/cardServices";
import { useState, useEffect } from "react";
import { Link } from "react-router";

const Card = ({ cardId, boardId, columnId }) => {
  const [card, setCard] = useState(null);

  const fetchCardDetails = async () => {
    const cardDetails = await cardServices.getCardById(cardId);
    setCard(cardDetails);
  };

  useEffect(() => {
    fetchCardDetails();
  }, [cardId]);

  //find assigned user from id
  const assignedUserId = card?.assignedTo;
  const [assignedUser, setAssignedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAssignedUserDetails = async () => {
    if (assignedUserId) {
      setLoading(true);
      const allUsersOnBoard = await boardServices.getUsersOnBoard(boardId);
      const userDetails = allUsersOnBoard.find(
        (user) => user._id === assignedUserId
      );
      //console.log(userDetails);
      setLoading(false);
      setAssignedUser(userDetails);
    }
  };

  useEffect(() => {
    fetchAssignedUserDetails();
  }, [assignedUserId, loading]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {card && (
        <>
          <Link
            to={`/boards/${boardId}/card/${cardId}`}
            className="block -m-1 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C75A6] focus:ring-offset-2"
          >
            <p className="text-sm font-semibold text-gray-900">
              <span className="text-gray-600 font-normal">Title:</span>{" "}
              {card.title}
            </p>

            <p className="mt-1 text-sm text-gray-700">
              <span className="text-gray-600 font-medium">Description:</span>{" "}
              {card.description || "—"}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              <span className="font-medium text-gray-700">Assigned to:</span>{" "}
              {card.assignedTo
                ? assignedUser?.name || "Loading..."
                : "Unassigned"}
            </p>

            <p
              className={[
                "mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium",
                card.completed
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700",
              ].join(" ")}
            >
              {card.completed ? "Completed" : "In Progress"}
            </p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
