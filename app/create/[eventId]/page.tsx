import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import { IconBadge } from "@/components/icon-badge";



import AttachmentForm from "./_components/AttachmentForm";
import EventDescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import Actions from "./_components/Actions";
import Banner from "@/components/banner";
import CategoryForm from "./_components/CategoryForm";
import VideoAttachmentForm from "./_components/VideoAttachmentForm";

const EventIdPage = async ({params}:{params:{eventId:string}}) => {
    const {userId} = auth();
    if(!userId){
        return redirect("/")
    }
    const schoolEvent = await db.schoolEvent.findUnique({
        where:{
            id:params.eventId,
            userId
        },
        include:{
            attachments:{
                orderBy:{
                    createdAt:"desc"
                }
            },
            category:true
        }
    })


    if(!schoolEvent){
        return redirect("/")
    }
    const categories = await db.category.findMany({
        orderBy:{
            name:"asc"
        }
    })
    const requiredFields = [
        schoolEvent.title,
        schoolEvent.description,
        schoolEvent.imageUrl
    ]
    
    const totalFields = requiredFields.length;
    const completedFields= requiredFields.filter(Boolean).length;
    const completionText  = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)
  return (
    <>
     {!schoolEvent.isPublished &&(
        <Banner
            label="This event is unpublished. It will not be visible on the website."
        />
    )}
    <div className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Event Setup
                </h1>
                <span className="text-sm text-slate-700">
                    Complete all fields {completionText}
                </span>
            </div>
            <Actions
                disabled={!isComplete}
                eventId={params.eventId}
                isPublished={schoolEvent.isPublished}
            />
         
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard}/>
                    <h2 className="text-xl"> 
                        Customize your event
                    </h2>
                </div>
                <TitleForm
                    initialData={schoolEvent}
                    eventId={schoolEvent.id}
                />

                <EventDescriptionForm
                    initialData={schoolEvent}
                    eventId={schoolEvent.id}
                />
                <ImageForm
                    initialData={schoolEvent}
                    eventId={schoolEvent.id}
                />
                 <CategoryForm
                    initialData={schoolEvent}
                    eventId={schoolEvent.id}
                    options={categories.map((category)=>({
                        label:category.name,
                        value:category.id
                    }))}
                />
                
            </div>
            <div className="space-y-6">
                <div>
                    
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={File}/>
                        <h2 className="text-xl">
                            Resources & Attachments
                        </h2>
                    </div>
                    {schoolEvent.category?.name === 'Video' ? 
                    ( 
                        
                        <VideoAttachmentForm
                            initialData={schoolEvent}
                            eventId={schoolEvent.id}
                        />
                    )
                    :(
                        <AttachmentForm
                            initialData={schoolEvent}
                            eventId={schoolEvent.id}
                        />
                    )
                    }
                   
                     
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default EventIdPage