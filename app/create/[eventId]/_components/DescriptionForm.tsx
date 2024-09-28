"use client"

 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { Pencil } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"
import { SchoolEvent } from "@prisma/client"
import { useToast } from "@/hooks/use-toast"
interface EventDescriptionFormProps{
    initialData:SchoolEvent
    eventId:string;
}
const formSchema = z.object({
    description: z.string().min(1, {
      message: "Description is required.",
    }),
  })
const EventDescriptionForm = ({initialData, eventId}:EventDescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter()
    const {toast} = useToast()
    const toggleEdit = ()=>setIsEditing((current)=>!current)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {description: initialData?.description || ""}
      })
const {isSubmitting, isValid} = form.formState;
async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/event/${eventId}`,values);
        toast({
          variant:"success",
          title: "Event Description Updated",
        }) 
        toggleEdit()
        router.refresh()
    }
    catch{
      toast({
        variant: "destructive",
        title: "Something Went Wrong",
      })
    }
    console.log(values)
  }
  return (
    <div className="mt-6 border bg-slate-800 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
             Event Description
            <Button  onClick={toggleEdit} variant={"ghost"}>
                {isEditing ? (
                    <>Cancel</>
                ) : 
                 (
                <>  <Pencil className="h-4 w-4 mr-2" />
                    Edit Description
                </>
                )}
                
            </Button>
        </div>
        {!isEditing && (
            <div className={cn("text-sm mt-2", !initialData.description && "text-slate-500 italic")}>
                {!initialData.description && "No description"}
                {initialData.description && (
                  <Preview
                    value={initialData.description}
                  />
                )}
            </div>
         )}
         {isEditing && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Editor
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center gap-x-2"> 
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                    >   
                        Save
                    </Button>
                  </div>
                </form>
              </Form>
         )}
    </div>
  )
}

export default EventDescriptionForm