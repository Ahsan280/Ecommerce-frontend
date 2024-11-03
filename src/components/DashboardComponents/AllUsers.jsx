import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../features/UserSlice";
import useAxios from "../../utils/useAxios";
import EditUserModal from "./EditUserModal"; // Import the modal component
import { useAuthContext } from "../../context/AuthContext";

const AllUsers = () => {
  const dispatch = useDispatch();
  const api = useAxios();
  const { user } = useAuthContext();
  const { users } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers(api));
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(userToDelete);
    console.log("---------");
    dispatch(deleteUser({ api, userId: userToDelete._id }));
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4 h-[70vh]">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((cuser) => (
              <>
                {cuser._id == user._id ? (
                  ""
                ) : (
                  <tr
                    key={cuser._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6">{cuser.fullName}</td>
                    <td className="py-3 px-6">{cuser.email}</td>
                    <td className="py-3 px-6">{cuser.phoneNumber}</td>
                    <td className="py-3 px-6 flex space-x-2">
                      <button
                        onClick={() => handleEdit(cuser)}
                        className="bg-blue-500 text-white rounded px-4 py-1 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(cuser)}
                        className="bg-red-500 text-white rounded px-4 py-1 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdate}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {userToDelete?.fullName}?</p>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
