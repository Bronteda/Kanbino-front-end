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
    <div>
      <p>Card ID: {cardId}</p>
      {card && (
        <>
          <Link to={`/boards/${boardId}/card/${cardId}`}>
            <p>Title: {card.title}</p>
            <p>Description: {card.description}</p>
            <p>
              Assigned to:{" "}
              {card.assignedTo
                ? assignedUser?.name || "Loading..."
                : "Unassigned"}
            </p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Card;
