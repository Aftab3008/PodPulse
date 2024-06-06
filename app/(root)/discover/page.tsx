"use client";
import EmptyState from "@/components/shared/EmptyState";
import Loader from "@/components/shared/Loader";
import PodcastCard from "@/components/shared/PodcastCard";
import Searchbar from "@/components/shared/Searchbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function page({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) {
  const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || "",
  });

  return (
    <div className="flex flex-col gap-9">
      <Searchbar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          {!search ? "Discover Trending Podcasts" : "Search results for "}
          {search && <span className="text-white-2">{search}</span>}
        </h1>
        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div className="podcast_grid">
                {podcastData.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imageUrl!}
                    title={podcast.podcastTitle}
                    description={podcast.podcastDescription}
                    podcastId={podcast._id}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="No podcasts found" />
            )}
          </>
        ) : (
          <div className="mt-40">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
