"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"

import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Attachment,  SchoolEvent } from "@prisma/client"
import { FileUpload } from "@/components/FileUpload"
import { useToast } from "@/hooks/use-toast"
interface AttachmentFormProps{
    initialData:SchoolEvent & {attachments:Attachment[]}
    eventId:string;
}
const formSchema = z.object({
    url: z.string().min(1),
  })
const AttachmentForm = ({initialData, eventId}:AttachmentFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId]=useState<string | null>(null)
    const router = useRouter()
    const {toast} = useToast()
    const toggleEdit = ()=>setIsEditing((current)=>!current)
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            await axios.post(`/api/event/${eventId}/attachments`,values);
            toast({
                variant:"success",
                title: "Success",
                description: "Attachment Uploaded",
              })
            toggleEdit()
            router.refresh()
        }
        catch{
            toast({
                variant: "destructive",
                title: "Something Went Wrong",
                description: "There was a problem with your request.",
              })
        }
    }
    const onDelete = async (id:string)=>{
        try{
            setDeletingId(id);
            await axios.delete(`/api/event/${eventId}/attachments/${id}`)
            toast({
                variant:"success",
                title: "Success",
                description: "Attachment Deleted",
              })
            router.refresh();
        }catch{
            toast({
                variant: "destructive",
                title: "Something Went Wrong",
                description: "There was a problem with your request.",
              })
        }finally{
            setDeletingId(null)
        }
    }
  return (
    <div className="mt-6 border bg-slate-800 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Event Attachments
            <Button  onClick={toggleEdit} variant={"ghost"}>
                {isEditing && (
                    <>Cancel</>
                )} 
                 {!isEditing && (
                <>  <PlusCircle className="h-4 w-4 mr-2" />
                    Add a file
                </>
                )}
            </Button>
        </div>
        {!isEditing && (
            <>
            {initialData.attachments.length === 0 && (
                <p className="text-sm mt-2 text-slate-500 italic">
                    No attachments here
                </p>
            )}
            {initialData.attachments.length>0 &&(
                <div className="space-y-2">
                    {initialData.attachments.map((attachment)=>(
                        <div
                            key={attachment.id}
                            className="flex items-center p-3 w-full bg-sky-100 border-sky-200
                                border text-sky-700 rounded-md"
                        >
                            <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                            <p className="text-xs line-clamp-1">{attachment.name}</p>
                            {deletingId === attachment.id && (
                                <div>
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                </div>
                            )}
                            {deletingId !== attachment.id && (
                                <button 
                                    onClick={()=>onDelete(attachment.id)}
                                    className="ml-auto hover:opacity-75 transition">
                                    <X className="h-4 w-4"/>
                                </button>
                            )}
                        </div>
                    ))}

                </div>
            )}
            </>
            )
         }
         {isEditing && (
             <div>
                <FileUpload
                    endpoint="courseAttachment"
                    onChange={(url)=>{
                        if(url){
                            onSubmit({url:url})
                        }
                    }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                    Add anything relevant to the event.
                </div>
             </div>   
         )}
    </div>
  )
}

export default AttachmentForm