import { SchoolEvent } from "@prisma/client";
import EventCard from "./event-card";


interface EventListProps{
    items:SchoolEvent[]
}

const EventsList = ({items}:EventListProps) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
              {items.map((item) => (
                 <EventCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl!}
                    createdAt={item.createdAt}
                    categoryId={item.categoryId!}
                 />
              ))}
          </div>
          {items.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10"> 
                No events found
            </div>
          )} 
    </div>
  )
}

export default EventsList