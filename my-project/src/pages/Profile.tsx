import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { api } from "../lib/axios";
import { toast } from "react-toastify";
import { User, Lock, Save, Loader2, Mail, ShieldAlert, KeyRound } from "lucide-react";
import Modal from "../components/UI/Modal";

const Profile = () => {
  const { user } = useUserStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative p-6 w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse mix-blend-multiply delay-700"></div>

      {/* Main Profile Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden border border-white/50">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
        </div>

        {/* Profile Content */}
        <div className="relative px-8 pb-8 flex flex-col items-center">
          {/* Avatar Container */}
          <div className="relative -top-16 mb-[-3rem]">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-lg">
              <User size={64} className="text-blue-500/80 drop-shadow-sm" />
            </div>
            <div className="absolute bottom-1 right-3 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 tracking-tight mt-2">
            {user.firstName} {user.lastName}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100 flex items-center gap-1.5 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5" />
              {user.role}
            </span>
          </div>

          <div className="w-full mt-8 space-y-4">
            <div className="flex items-center gap-4 px-4 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-50">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</span>
                <span className="text-gray-700 font-medium truncate">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-2xl overflow-hidden shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <KeyRound className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Update Password
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          title="Secure Your Account"
        >
          <div className="mb-6 mt-2">
            <p className="text-sm text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-800 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
