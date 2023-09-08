import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import { supabase } from "@/lib/supabase";

let notification: string;

export default async function handleAudioUpload(audio: File) {
  const file = audio;
  const fileName = `${v4()}.mp3`;
  const filePath = `${fileName}`;

  const { data: audioUploadData, error: audioUploadError } =
    await supabase.storage.from("audio").upload(filePath, file!);

  if (audioUploadError) {
    console.log(
      "🚀 ~ file: audioUpload.ts ~ handleUpload ~ audioUploadError:\n",
      audioUploadError,
    );
    toast.error("Audio Upload error!");
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio/${audioUploadData?.path}`;

  return url;
}
