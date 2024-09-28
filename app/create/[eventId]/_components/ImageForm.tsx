"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"

import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { useState } from "react"

import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FileUpload } from "@/components/FileUpload"
import { SchoolEvent } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
interface ImageFormProps{
    initialData:SchoolEvent
    eventId:string;
}
const formSchema = z.object({
    imageUrl: z.string().min(1, {
      message: "Image is required.",
    }),
  })
const ImageForm = ({initialData, eventId}:ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const {toast} = useToast();
    const router = useRouter()
    const toggleEdit = ()=>setIsEditing((current)=>!current)
async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/event/${eventId}`,values);
        toast({
            variant:"success",
            title: "Success",
            description: "Event Image Updated",
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
  return (
    <div className="mt-6 border bg-slate-800 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
            Event Image
            <Button  onClick={toggleEdit} variant={"ghost"}>
                {isEditing && (
                    <>Cancel</>
                )} 
                 {!isEditing && !initialData.imageUrl &&(
                <>  <PlusCircle className="h-4 w-4 mr-2" />
                    Add an image
                </>
                )}
                
                 {!isEditing && initialData.imageUrl && (
                <>  <Pencil className="h-4 w-4 mr-2" />
                    Edit Image
                </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            !initialData.imageUrl ? (
                <div className="flex items-center justify-center h-60 bg-slate-800 rounded-md">
                    <ImageIcon className="h-10 w-10 text-slate-500"/>
                </div>
            ) : (
                <div className="relative aspect-video mt-2">
                    <Image
                       alt="Upload"
                       fill
                       className="object-cover rounded-md" 
                       src={initialData.imageUrl}
                    />
                </div>
            )
         )}
         {isEditing && (
             <div>
                <FileUpload
                    endpoint="courseImage"
                    onChange={(url)=>{
                        if(url){
                            onSubmit({imageUrl:url})
                        }
                    }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                    16:9 aspect ratio recommended
                </div>
             </div>   
         )}
    </div>
  )
}

export default ImageForm