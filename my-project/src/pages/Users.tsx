import { Users as UsersIcon } from "lucide-react";
import UsersTable from "../components/Users/UsersTable";

const UsersPage = () => {
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
        </div>
      </div>

      <UsersTable />
    </div>
  );
};

export default UsersPage;
