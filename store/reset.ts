import { useAuthStore } from "./user/userAuthStore";
import { useUserStore } from "./user/userStore";

export const resetAllStores = () => {
  useUserStore.getState().reset?.();
  useAuthStore.getState().reset?.();
};
