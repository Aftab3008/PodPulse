import { api } from "@/convex/_generated/api";
import { PodcastCardProps } from "@/types";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PodcastCard({
  imgUrl,
  title,
  description,
  podcastId,
}: PodcastCardProps) {
  const router = useRouter();
  const incrementViews = useMutation(api.podcasts.incrementPodcastViews);

  const handleViews = () => {
    //todo: increment views
    incrementViews({ podcastId });
    router.push(`/podcast/${podcastId}`);
  };
  return (
    <div className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <h2 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h2>
        </div>
      </figure>
    </div>
  );
}
