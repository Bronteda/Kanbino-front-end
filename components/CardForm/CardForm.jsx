import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as boardServices from "../../services/boardServices";
import * as cardServices from "../../services/cardServices";

const CardForm = ({addCardToColumn, editCard}) => {
  const initialState = {
    title: "",
    description: "",
    assignedTo: "",
  };

  const navigate = useNavigate();
  const { boardId, columnId, cardId } = useParams();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // Only fetch users once per board
    const fetchUsers = async () => {
      try {
        const users = await boardServices.getUsersOnBoard(boardId);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (boardId) fetchUsers();
  }, [boardId]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (cardId) {
        await editCard(cardId, formData);
        navigate(`/boards/${boardId}`);
      } else {
        await addCardToColumn(boardId, columnId, formData);
        navigate(`/boards/${boardId}`);
      }
    } catch (error) {
      console.error(
        cardId ? "Error editing card:" : "Error creating card:",
        error
      );
    }
  };

  useEffect(() => {
    if (cardId) {
      const fetchCardDetails = async () => {
        try {
          const card = await cardServices.getCardById(cardId);
          // If assignedTo is a user object, get its _id
          let assignedId = "";
          if (card.assignedTo) {
            assignedId =
              typeof card.assignedTo === "object"
                ? card.assignedTo._id
                : card.assignedTo;
          }
          setFormData({
            title: card.title,
            description: card.description,
            assignedTo: assignedId,
          });
        } catch (error) {
          console.error("Error fetching card details:", error);
        }
      };
      fetchCardDetails();
    }
  }, [cardId]);

  return (
    <>
      <h2 className="text-xl font-bold text-center text-[#3C75A6] mb-6 mt-8">
        {cardId ? "Edit Card" : "Create Card"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
        {/* completed still to do */}
        {/* <div> */}
          {/* <label htmlFor="completed" className="block text-sm font-medium text-gray-700 mb-1">
            Mark as Completed
          </label>
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 rounded focus:ring-[#F36A1B] focus:outline-none"
          />
        </div> */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter card title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description (max 500 chars)"
            maxLength={500}
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#F36A1B] focus:outline-none resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Assign To
          </label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-[#F36A1B] focus:outline-none bg-white"
          >
            <option value="">Select User</option>
            {users.length === 0 ? (
              <option disabled>Loading users...</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#F36A1B] text-white font-semibold rounded-full shadow hover:bg-[#3C75A6] transition-colors"
          >
            {cardId ? "Update Card" : "Create Card"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full shadow hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CardForm;
