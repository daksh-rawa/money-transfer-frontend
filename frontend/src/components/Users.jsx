import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";


import React from "react";

export const Users = () => {
  // State for user array and search filter
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  
  const [loading, setLoading] = useState(false);

  // Debounced search/filter effect
  useEffect(() => {
    setLoading(true);
    console.log("Filter changed to:", filter); // Debug log
    const delayDebounce = setTimeout(() => {
      console.log("Making API call with filter:", filter); // Debug log
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + (filter))
        .then(response => {
          console.log("API response:", response.data); // Debug log
          setUsers(response.data.user || []);
        })
        .catch((error) => {
          console.error("API error:", error); // Debug log
          setUsers([]);
        })
        .finally(() => setLoading(false));
    }, 400); // 400ms debounce, adjust as needed

    // Cleanup: clear the timeout if filter changes quickly
    return () => clearTimeout(delayDebounce);
  }, [filter]);

  return (
    <>
      {/* Fixed typo: className="font-bold" */}
      <div className="font-bold text-xl mb-2">Users</div>

      <div className="my-2">
        <input
          onChange={e => setFilter(e.target.value)}
          type="text"
          placeholder="Search users"
          className="border rounded p-2 mb-4 w-full"
          value={filter}
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No users found.</div>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <User key={user._id} user={user} />
          ))}
        </div>
      )}
    </>
  );
};

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <div
                    className="text-gray-600 font-semibold">
                    {user.username[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div>
                <span className="text-gray-800 font-semibold">{user.username}</span>
                </div>
                <div>
                <span className="text-gray-600">{user.email}</span>
                </div>
            </div>
            </div>
            {/* <h3 className="text-lg font-semibold">{user.name}</h3>


            <p className="text-gray-600">{user.email}</p> */}

            <div lable="sendmoney" className="flex items-center">
                <Button text="Send" onClick={() =>
                    navigate(`/send?id=${user._id}&name=${user.username}`)
                }
                 >
                </Button>
            </div>
            {/* <NavLink to={`/users/${user.id}`}>
                <Button>View Details</Button>
            </NavLink> */}
        </div>
    );

};

