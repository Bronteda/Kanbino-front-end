import { Link, useNavigate } from "react-router";


const Dashboard = ({ user, boards, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
      <h3 className="text-lg text-gray-600 mb-6">Welcome {user.name}</h3>

      {boards && boards.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board, index) => (
            <div
              key={board._id ? board._id : `board-${index}`}
              className="bg-gray-50 border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow"
            >
              <Link to={`/boards/${board._id}`}>
                <h4 className="text-xl font-semibold mb-3 text-[#3C75A6]">
                  {board.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  Due Date:{" "}
                  <span className="font-medium">
                    {board.dueDate
                      ? new Date(board.dueDate).toLocaleDateString()
                      : "No date"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Start Date:{" "}
                  <span className="font-medium">
                    {board.startDate
                      ? new Date(board.startDate).toLocaleDateString()
                      : "No date"}
                  </span>
                </p>
              </Link>
              {/* Add that the owner of the board can only edit or delete the board */}
              {user._id === board.owner && (
                <div className="mt-4 flex">
                  <button
                    className="w-full px-2 py-2 bg-[#F36A1B] text-white font-medium rounded-lg hover:bg-[#3C75A6] transition-colors mr-2"
                    onClick={() => navigate(`/boards/${board._id}/edit`)}
                  >
                  Edit Board
                </button>
                <button
                  className="w-full px-4 py-2 bg-[#F36A1B] text-white font-medium rounded-lg hover:bg-[#3C75A6] transition-colors"
                  onClick={async () => {
                    await deleteBoard(board._id);
                    navigate(`/`);
                  }}
                >
                  Delete Board
                </button>
              </div>
              )}
            </div>
            
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">No boards available</p>
      )}

      <div className="mt-8">
        <Link to="/boards">
          <button className="px-5 py-2 bg-[#F36A1B] text-white font-medium rounded-xl hover:bg-[#3C75A6] transition-colors shadow-md">
            Add New Board
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
