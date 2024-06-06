"use client";
import PodcastCard from "@/components/shared/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader } from "lucide-react";

export default function Home() {
  const podcastData = useQuery(api.podcasts.getTrendingPodcasts);
  if (!podcastData)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {podcastData?.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              imgUrl={podcast.imageUrl!}
              title={podcast.podcastTitle}
              description={podcast.podcastDescription}
              podcastId={podcast._id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
