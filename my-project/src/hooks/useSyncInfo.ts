import { api } from "../lib/axios";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";

export const useSyncInfo = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/user");
        setUser(response?.data);
      } catch (error) {
        clearUser();
      }
    };

    fetchUserInfo();
  }, [setUser, clearUser]);
};
