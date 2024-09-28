import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Suspense } from 'react'

interface VideoGalleryCardProps{
    videoUrl:string;
}
const VideoGalleryCard = ({videoUrl}:VideoGalleryCardProps) => {
  videoUrl = videoUrl.replace('watch?v=','embed/')

  return (
    <>
        <div className="group hover:shadow-sm  transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative rounded-md overflow-hidden aspect-video  h-[250px]">
            <Suspense fallback={<p>Loading video...</p>}>
              <iframe height={250} src={videoUrl} allowFullScreen/>
             </Suspense>
            </div>
        </div>
    </>
  )
}

export default VideoGalleryCard