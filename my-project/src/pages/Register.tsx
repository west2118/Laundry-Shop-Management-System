import { Lock, Mail, Key, User, Eye, EyeOff, Loader, Droplet } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { api, setAccessToken } from "../lib/axios";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      return toast.error("Missing Required Field");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Password not matched");
    }

    if (!isAgree) {
      return toast.error("Plese check on agree terms");
    }

    startTransition(async () => {
      try {
        const response = await api.post("/auth/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        setAccessToken(response.data.accessToken);
        navigate("/login");
        toast.success(response?.data?.message);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-white to-blue-50 flex relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 z-10">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-4 shadow-sm">
              <Droplet className="w-8 h-8 text-cyan-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-600">
              Join us today and start your journey
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6  ">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white/50 backdrop-blur-sm"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-600 transition-colors"
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
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-600 transition-colors"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={isAgree}
                  onChange={(e) => setIsAgree(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-cyan-600 hover:text-cyan-700">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-cyan-600 hover:text-cyan-700">
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="w-full bg-linear-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/30 font-semibold flex items-center justify-center space-x-2">
                {isPending && <Loader className="animate-spin h-5 w-5" />}
                <span>Create your account</span>
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors">
                  Sign in
                </button>
              </p>
            </form>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Your data is securely encrypted and protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
