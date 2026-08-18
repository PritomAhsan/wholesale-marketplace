"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { useAuth } from "@/features/auth/AuthContext";
import { fetchFollowStatus, toggleStoreFollow } from "../followApi";

interface Props {
  sellerId: string;
}

export default function FollowButton({ sellerId }: Props) {
  const { user, token } = useAuth();
  const router = useRouter();

  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // The page itself is server-rendered without a buyer's token, so
    // the real follow state can only be known from a client-side call
    // once the stored token is available.
    if (!token) return;

    fetchFollowStatus(sellerId, token).then(setFollowing);
  }, [sellerId, token]);

  async function handleClick() {
    if (!user || !token) {
      router.push("/login");
      return;
    }

    setLoading(true);

    try {
      const result = await toggleStoreFollow(sellerId, token);
      setFollowing(result.following);
    } catch {
      // Leave the button in its previous state — nothing to recover
      // from client-side beyond letting the buyer try again.
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
        following
          ? "border-sapphire bg-sapphire-soft text-sapphire-strong"
          : "border-border text-obsidian/70 hover:border-sapphire hover:text-sapphire-strong"
      }`}
    >
      <Heart className={`h-4 w-4 ${following ? "fill-sapphire text-sapphire" : ""}`} />
      {following ? "Following" : "Follow Store"}
    </button>
  );
}
