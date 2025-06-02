export type TUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  points: number;
  role: string;
  verified_status: boolean;
  created_at: string;
  deleted_at?: string | null;
  is_banned: boolean;
}

export type TLogin = {
  access_token: string,
  refresh_token: string,
  user: TUser
}