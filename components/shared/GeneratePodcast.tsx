import { GeneratePodcastProps } from "@/types";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "../ui/use-toast";

export default function GeneratePodcast({
  setAudioStorageId,
  setAudio,
  voiceType,
  audio,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) {
  const { isGenerating, generatePodcast } = useGeneratePodcast({
    setAudioStorageId,
    setAudio,
    voiceType,
    audio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration,
  });
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class focus-visible:ring-offset-orange-1 font-light"
          placeholder="Provide a prompt to generate audio"
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16  bg-orange-1 py-4 font-bold text-white-1"
          disabled={isGenerating}
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {audio && (
        <audio
          src={audio}
          autoPlay
          onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          className="mt-5"
          controls
        />
      )}
    </div>
  );
}

// Hook

function useGeneratePodcast({
  setAudioStorageId,
  setAudio,
  voiceType,
  voicePrompt,
}: GeneratePodcastProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    if (!voicePrompt) {
      toast({
        title: "Please provide a  voicetype to generate audio",
      });
      setIsGenerating(false);
      return;
    }
    try {
      const responce = await getPodcastAudio({
        input: voicePrompt,
        voice: voiceType,
      });
      const blob = new Blob([responce], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log("Error generating podcast", error);
      setIsGenerating(false);
      toast({
        title: "Error generating podcast",
        variant: "destructive",
      });
    }
  };
  return {
    isGenerating,
    generatePodcast,
  };
}
