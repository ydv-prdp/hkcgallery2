import { db } from '@/lib/db'
import Image from 'next/image'
import React from 'react'
import ImageGalleryCard from '../_components/ImageGalleryCard'
import { Preview } from '@/components/preview'
import { useRouter } from 'next/navigation'

const EventId = async({params}:{params:{eventId:string}}) => {
    const eventIdData = await db.schoolEvent.findUnique({
        where:{
            id:params.eventId,
            isPublished:true,
        },
        
        include:{
            attachments:true
        }
    })
    
  return (
    <div className='flex flex-col w-full max-w-screen-xl mx-auto items-center mt-10 gap-5'>
        <p className='text-6xl text-center'>{eventIdData?.title}</p>
       
        <Image
            src={eventIdData?.imageUrl!}
            alt={eventIdData?.title!}
            className='aspect-video rounded-md'
            width={600}
            height={600}
            
        />
        <Preview
            value={eventIdData?.description!}
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
              {eventIdData?.attachments.map((item) => (
                 <ImageGalleryCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    imageUrl={item.url!}
                 />
              ))}
          </div>
    </div>
  )
}

export default EventId