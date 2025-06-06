import React from "react";
import { Metadata } from "next";
import ProfilMePage from "@/containers/profil/ProfilContainer";

export const metadata: Metadata = {
  title: "User Profile - Sosmedz",
  description: "View and explore user profiles on Sosmedz.",
  openGraph: {
    title: "User Profile - Sosmedz",
    description: "View and explore user profiles on Sosmedz.",
    url: "https://sosmedz.com/profil",
    siteName: "Sosmedz",
    type: "website",
  },
};

const ProfilePage = async () => {
  return <ProfilMePage />;
};

export default ProfilePage;
