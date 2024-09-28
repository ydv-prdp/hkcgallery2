import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

interface ImageGalleryCardProps{
    id:string;
    title:string;
    imageUrl:string;
}
const ImageGalleryCard = ({id, title, imageUrl}:ImageGalleryCardProps) => {
  return (
    <>
        <div className="group hover:shadow-sm  transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                   height={200}
                   width={200}
                   className="object-cover hover:opacity-80"
                   alt={title}
                   src={imageUrl} 
                />
                
            </div>
        </div>
    
        </>
  )
}

export default ImageGalleryCard