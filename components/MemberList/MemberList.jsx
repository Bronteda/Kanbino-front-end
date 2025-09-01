import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import UsersList from "../UsersList/UsersList";
import { UserContext } from "../../contexts/UserContext";
import * as boardServices from "../../services/boardServices";

const MembersList = ({ boards }) => {
  const { boardId } = useParams();
  const { user } = useContext(UserContext);
  const [searchData, setSearchData] = useState("");

  //search bar input handler
  let inputHandler = (event) => {
    const lowerCase = event.target.value.toLowerCase();
    setSearchData(lowerCase);
  };

  // Fetch members for the board using boardId
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const members = await boardServices.getBoardMembers(boardId);
      //console.log(members[0].name);
      setMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [boardId]);

  const getBoardOwnerId = (boardId) => {
    const board = boards.find((b) => b._id === boardId);
    //console.log(board);
    return board ? board.ownerId : null;
  };

  const isOwner = () => {
    const ownerId = getBoardOwnerId(boardId);
    //console.log("user._id:", user);
    return ownerId === user._id;
  };

  //console.log(isOwner());

  const addMemberToBoard = async (boardId, username) => {
    try {
      await boardServices.addMemberToBoard(boardId, username);
      // Refresh members
      fetchMembers();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const removeMemberFromBoard = async (boardId, memberId) => {
    try {
      await boardServices.removeMemberFromBoard(boardId, memberId);
      // Refresh members
      fetchMembers();
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

return (
    <div className="max-w-2xl mx-auto px-4 py-8">
        {isOwner() && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
                <h1 className="text-2xl font-bold text-[#3C75A6] mb-4 text-center">
                    Member Search
                </h1>
                <div className="mb-6">
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                <UsersList
                    input={searchData}
                    boardId={boardId}
                    addMemberToBoard={addMemberToBoard}
                    members={members}
                    getBoardOwnerId={getBoardOwnerId}
                />
            </div>
        )}

        <h2 className="text-xl font-semibold text-[#3C75A6] mb-6 text-center">
            Members
        </h2>

        {members.length > 0 ? (
            <ul className="space-y-3">
                {members.map((member) => (
                    <li
                        key={member._id}
                        className="flex items-center justify-between bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-[#3C75A6] text-white flex items-center justify-center text-sm font-bold">
                                {member.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {member.name}
                                </p>
                                <p className="text-xs text-gray-500">@{member.username}</p>
                            </div>
                        </div>
                        {isOwner() && (
                            <button
                                onClick={() => removeMemberFromBoard(boardId, member._id)}
                                className="h-8 w-8 flex items-center justify-center bg-[#F36A1B] text-white text-sm font-bold rounded-full hover:bg-[#3C75A6] transition-colors"
                                aria-label={`Remove ${member.name}`}
                            >
                                ×
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-500 italic text-center">No members found.</p>
        )}

        <div className="mt-8 flex justify-center">
            <Link
                to={`/boards/${boardId}`}
                className="bg-[#3C75A6] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#F36A1B] transition-colors"
            >
                Back to Board
            </Link>
        </div>
    </div>
);
};

export default MembersList;
