import { useUserStore } from "./user/userStore";

export const resetAllStores = () => {
  useUserStore.getState().reset?.();
};
