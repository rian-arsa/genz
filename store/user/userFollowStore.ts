import { create } from 'zustand';

type UserDetail = {
  id: string;
  isFollowing: boolean;
};

type UserFollowStore = {
  userDetail: UserDetail | null;
  setUserDetail: (user: UserDetail) => void;
  toggleFollow: () => void;
};

export const useUserFollowStore = create<UserFollowStore>((set, get) => ({
  userDetail: null,
  setUserDetail: (user) => set({ userDetail: user }),
  toggleFollow: () =>
    set((state) => ({
      userDetail: state.userDetail
        ? { ...state.userDetail, isFollowing: !state.userDetail.isFollowing }
        : null,
    })),
}));
