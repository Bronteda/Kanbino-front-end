import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router";


const ColumnForm = ({ createColumn, updateColumn, boards }) => {
  const initialState = {
    title: "",
  };

  const navigate = useNavigate();
  const { boardId, columnId } = useParams();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (columnId) {
        await updateColumn(boardId, columnId, formData);
      } else {
        await createColumn(boardId, formData);
      }
    } catch (error) {
      console.error("Error submitting column form:", error);
    }
  };

  useEffect(() => {
    if (columnId) {
      const column = boards
        .find((b) => b._id === boardId)
        ?.columns.find((c) => c._id === columnId);
      console.log(column);
      if (column) {
        setFormData({
          title: column.title,
        });
      }

      return () => setFormData(initialState); // clean up
    }
  }, [columnId]);

  return (
    <>
      <h2 className="text-xl font-bold text-center text-[#3C75A6] mb-6 mt-8">
        {columnId ? "Edit Column" : "Add a New Column"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#F36A1B] text-white font-semibold rounded-full shadow hover:bg-[#3C75A6] transition-colors"
          >
            {columnId ? "Update Column" : "Create Column"}
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
export default ColumnForm;
