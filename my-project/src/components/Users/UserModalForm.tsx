import { Mail, User, UserPlus, Loader, Lock, Eye, EyeOff } from "lucide-react";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";

type UserModalFormProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const UserModalForm = ({
  isModalOpen,
  isCloseModal,
}: UserModalFormProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message || "User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users-data"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong"
      );
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing Required Field");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password not matched");
    }

    mutation.mutate(formData);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Add New User">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User className="h-4 w-4 mr-2" />
                First name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                Last name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Lock className="h-4 w-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create a password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              disabled={mutation.isPending}
              onClick={isCloseModal}
              type="button"
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition">
              Cancel
            </button>

            <button
              disabled={mutation.isPending}
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center">
              {mutation.isPending ? (
                <Loader className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              Add User
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UserModalForm;
