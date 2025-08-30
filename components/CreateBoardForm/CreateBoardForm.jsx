import { useState } from "react";

const CreateBoardForm = ({ createBoard }) => {
  const initialState = {
    title: "",
    dueDate: "",
    startDate: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBoard(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Board Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Board Title"
        required
      />
      <label htmlFor="startDate">Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <label htmlFor="dueDate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Board</button>
    </form>
  );
};

export default CreateBoardForm;
