"use client";

import Loader from "@/components/shared/Loader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function page() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.push(`/profile/${user.id}`);
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  );
}
