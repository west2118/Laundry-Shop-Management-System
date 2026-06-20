import { Users as UsersIcon, UserPlus } from "lucide-react";
import UsersTable from "../components/Users/UsersTable";
import { useState, useCallback } from "react";
import UserModalForm from "../components/Users/UserModalForm";

const UsersPage = () => {
  const [isUserFormModal, setIsUserFormModal] = useState(false);

  const closeUserFormModal = useCallback(() => {
    setIsUserFormModal(false);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <UsersIcon className="mr-2 h-7 w-7 text-blue-600" />
              Users
            </h1>
            <p className="text-gray-600 mt-1">
              Manage system administrators and staff accounts
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <button
              onClick={() => setIsUserFormModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Add User
            </button>
          </div>
        </div>
      </div>

      <UsersTable />

      {isUserFormModal && (
        <UserModalForm
          isModalOpen={isUserFormModal}
          isCloseModal={closeUserFormModal}
        />
      )}
    </div>
  );
};

export default UsersPage;
