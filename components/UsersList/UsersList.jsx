import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import * as boardServices from "../../services/boardServices";

const UsersList = ({
  input,
  boardId,
  addMemberToBoard,
  members,
  getBoardOwnerId,
}) => {
  // Fetch usersList for the board using boardId
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersList = async () => {
    try {
      const usersList = await boardServices.getAllUsers();
      //console.log(usersList.users);
      setUsersList(usersList.users);
    } catch (error) {
      console.error("Error fetching usersList:", error);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  // filter data and exclude board owner
  const filteredUsers = usersList.filter((user) => {
    // Exclude board owner
    if (user._id === getBoardOwnerId(boardId)) return false;

    const username = user.username ? user.username.toLowerCase() : "";
    const inputLower = input.toLowerCase();

    if (inputLower === "") {
      return (
        user && !members.some((member) => member.username === user.username)
      );
    } else {
      return (
        username.includes(inputLower) &&
        !members.some((member) => member.username === user.username)
      );
    }
  });

  return (
    <>
      <div className="max-w-md mx-auto">
        <ul className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
              >
                {/* Avatar Circle */}
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-[#3C75A6] text-white flex items-center justify-center text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {user.username}
                  </span>
                </div>

                {/* Add Button */}
                <button
                  onClick={() => addMemberToBoard(boardId, user._id)}
                  className="h-8 w-8 flex items-center justify-center bg-[#F36A1B] text-white text-lg font-bold rounded-full hover:bg-[#3C75A6] transition-colors"
                >
                  +
                </button>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 italic">No users found</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default UsersList;
