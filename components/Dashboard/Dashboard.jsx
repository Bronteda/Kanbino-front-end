import { Link, useNavigate } from "react-router";


const Dashboard = ({ user, boards, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#3C75A6] mb-2">Your Dashboard</h1>
        <h3 className="text-lg text-gray-700">Welcome, <span className="font-semibold text-[#F36A1B]">{user.name}</span></h3>
      </header>

      {boards && boards.length > 0 ? (
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board, index) => (
            <div
              key={board._id ? board._id : `board-${index}`}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col"
            >
              <Link to={`/boards/${board._id}`} className="flex-1">
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-[#3C75A6] mb-2">{board.title}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium text-gray-800">Due Date:</span>{" "}
                      {board.dueDate ? new Date(board.dueDate).toLocaleDateString() : <span className="italic text-gray-400">No date</span>}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Start Date:</span>{" "}
                      {board.startDate ? new Date(board.startDate).toLocaleDateString() : <span className="italic text-gray-400">No date</span>}
                    </div>
                  </div>
                </div>
              </Link>
              {user._id === board.ownerId && (
                <div className="flex gap-2 px-6 pb-6">
                  <button
                    className="flex-1 px-3 py-2 bg-[#F36A1B] text-white font-semibold rounded-lg hover:bg-[#3C75A6] transition-colors"
                    onClick={() => navigate(`/boards/${board._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-[#F36A1B] text-white font-semibold rounded-lg hover:bg-[#3C75A6] transition-colors"
                    onClick={async () => {
                      await deleteBoard(board._id);
                      navigate(`/`);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </section>
      ) : (
        <p className="text-gray-400 italic text-center mt-12">No boards available</p>
      )}

      <div className="mt-10 flex justify-center">
        <Link to="/boards">
          <button className="px-6 py-3 bg-[#F36A1B] text-white font-bold rounded-xl hover:bg-[#3C75A6] transition-colors shadow-lg">
            Add New Board
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
