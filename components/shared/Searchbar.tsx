"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/lib/useDebounce";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`/discover?search=${debouncedSearch}`);
    } else if (!debouncedSearch && pathname === "/discover") {
      router.push(`/discover`);
    }
  }, [router, debouncedSearch, pathname]);

  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12 focus-visible:ring-offset-orange-1"
        placeholder="Search for podcasts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image
        src="/icons/search.svg"
        alt="Search"
        width={20}
        height={20}
        className="absolute top-3.5 left-4"
      />
    </div>
  );
}
