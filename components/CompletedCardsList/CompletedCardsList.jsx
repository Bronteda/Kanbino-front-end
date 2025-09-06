import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import CompletedCard from "../CompletedCard/CompletedCard";
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
    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-8 border border-green-300">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-green-800 flex items-center gap-3">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Completed Cards
        </h2>
        <Link to={`/boards/${boardId}`}>
          <button className="rounded-lg bg-[#3C75A6] px-5 py-2 text-white font-bold shadow hover:bg-[#3C75A6] transition-colors">
            Back to Board
          </button>
        </Link>
      </div>
      {completedCards.length === 0 ? (
        <div className="text-green-400 text-center py-12 italic text-lg">
          No completed cards yet.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCards.map((card) => (
            <li
              key={card._id}
              className="bg-white border border-green-200 rounded-xl p-5 shadow hover:shadow-xl transition-all"
            >
              <CompletedCard card={card} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CompletedCardsList;
