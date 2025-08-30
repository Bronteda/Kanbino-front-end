import * as cardServices from "../../services/cardServices";
import { useState, useEffect } from "react";

const Card = ({ cardId }) => {
  const [card, setCard] = useState(null);
  
  const fetchCardDetails = async () => {
    const cardDetails = await cardServices.getCardById(cardId);
    setCard(cardDetails);
  };

  useEffect(() => {
    fetchCardDetails();
  }, [cardId]);

  return (
    <div>
      <p>Card ID: {cardId}</p>
      {card && (
        <>
          <p>Title: {card.title}</p>
          <p>Description: {card.description}</p>
          <p>Assigned to: {card.assignedTo ? card.assignedTo : "Unassigned"}</p>
        </>
      )}
    </div>
  );
};

export default Card;
