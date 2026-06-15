import { Calendar, Mail, User } from "lucide-react";
import type { UserType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type UserTableRowProps = {
  user: UserType;
};

const UserTableRow = ({ user }: UserTableRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Joined {dateConvert(user.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center text-sm text-gray-900 truncate">
          <Mail className="h-4 w-4 mr-2 text-gray-500" />
          {user.email}
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}>
          {user.role}
        </span>
      </td>
      <td className="py-4 px-6">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
          {user.status}
        </span>
      </td>
    </tr>
  );
};

export default UserTableRow;
