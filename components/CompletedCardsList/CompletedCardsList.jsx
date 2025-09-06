import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../Card/Card";
import * as boardServices from "../../services/boardServices";

const CompletedCardsList = () => {
  const { boardId } = useParams();
  const [completedCards, setCompletedCards] = useState([]);

  const fetchCompletedCards = async () => {
    try {
      const allCards = await boardServices.getCardsByBoardId(boardId);
      //console.log(allCards.cards);
      const completedCardsFromBoard = allCards.cards.filter(
        (card) => card.completed === true
      );
      setCompletedCards(completedCardsFromBoard);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompletedCards();
  }, [boardId]);

return (
    <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Completed Cards</h2>
        {completedCards.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No completed cards yet.</div>
        ) : (
            <ul className="space-y-4">
                {completedCards.map((card) => (
                    <li key={card._id} className="bg-green-50 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                        <Card boardId={boardId} cardId={card._id} />
                    </li>
                ))}
            </ul>
        )}
    </div>
);
};
export default CompletedCardsList;
