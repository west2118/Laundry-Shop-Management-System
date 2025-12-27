import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";
import { auth } from "../lib/firebase";

export const useSyncInfo = () => {
  const setUserToken = useUserStore((state) => state.setUserToken);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchUserInfo = async (token: string) => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response?.data);
      } catch (error) {
        clearUser();
      }
    };

    const syncAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        clearUser();
        return;
      }

      const token = await user.getIdToken();
      setUserToken(token);
      await fetchUserInfo(token);
    };

    syncAuth();

    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      const newToken = await user?.getIdToken();
      setUserToken(newToken ?? null);

      if (newToken) {
        await fetchUserInfo(newToken);
      } else {
        clearUser();
      }
    });

    return () => unsubscribe();
  }, [setUserToken, setUser, clearUser]);
};
