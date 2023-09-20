import { supabase } from "@/lib/supabase";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";

let notification: string;

async function handleUpload(image: File) {
    const file = image;
    const fileName = `${v4()}.png`;
    const filePath = `${fileName}`;

    const { data: imageUploadData, error: imageUploadError } =
        await supabase.storage.from("images").upload(filePath, file!);

    if (imageUploadError) {
        console.log(
            "🚀 ~ file: NewCreation.tsx:59 ~ handleFileUpload ~ imageUploadError:\n",
            imageUploadError,
        );
        toast.error("Image Upload error!", { id: notification });
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imageUploadData?.path}`;
    toast.success("Art uploaded successfully!", { id: notification });
    return url;
}

export default handleUpload;