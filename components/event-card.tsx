import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";

interface EventCardProps{
    id:string;
    title:string;
    imageUrl:string;
    createdAt:Date;
    categoryId:string
}
const EventCard = ({id, title, imageUrl,createdAt,categoryId}:EventCardProps) => {
    const date = new Date(createdAt);
    const month = date.toLocaleString('default', { month: 'long' });
    const formattedDate = `${date.getDate()}-${month}-${date.getFullYear()}`;
 
  return (
    <>
    {categoryId === '14db20bd-937a-4b5c-bb77-ed1f943ca0d0' ? (
        <Link href={`/videogallery/${id}`}>
        <div className="group hover:shadow-sm hover:opacity-75 transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                   fill
                   className="object-cover"
                   alt={title}
                   src={imageUrl} 
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {formattedDate}
                </div>
            </div>
        </div>
    </Link>
    ):(
        <Link href={`/imagegallery/${id}`}>
        <div className="group hover:shadow-sm hover:opacity-75 transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                   fill
                   className="object-cover"
                   alt={title}
                   src={imageUrl} 
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                </div>
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {formattedDate}
                </div>
            </div>
        </div>
    </Link>
    )}
  </>
  )
}

export default EventCard