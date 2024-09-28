"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



interface ActionProps{
    disabled:boolean;
    eventId:string;
    isPublished:boolean;
}

const Actions = ({disabled, eventId,isPublished}:ActionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();
    const router = useRouter();
    const {toast} = useToast();
    const onClick = async()=>{
        try{
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`/api/event/${eventId}/unpublish`);
                toast({
                    variant:"success",
                    title: "Success",
                    description: "Event Unpublished",
                  })
            }
            else{
                await axios.patch(`/api/event/${eventId}/publish`);
                toast({
                    variant:"success",
                    title: "Success",
                    description: "Event Published Successfully",
                  })
                confetti.onOpen();
                router.push("/events") 
            }
            router.refresh()
        }catch{
            toast({
                variant: "destructive",
                title: "Something Went Wrong",
                description: "There was a problem with your request.",
              })
        }finally{
            setIsLoading(false)
        }
    }
    const onDelete=async()=>{
        try{
            setIsLoading(true)
            await axios.delete(`/api/event/${eventId}`)
            toast({
                variant:"success",
                title: "Success",
                description: "Event Deleted Successfully",
              })
            router.refresh();
            router.push(`/`)
        }catch{
            toast({
                variant: "destructive",
                title: "Something Went Wrong",
                description: "There was a problem with your request.",
              })
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div className="flex items-center gap-x-2">
         <Button
            onClick={()=>{router.push("/events")}}
            disabled={disabled || isLoading}
            variant={"outline"}
            size={"sm"}
        >
            Events
        </Button>
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            variant={"outline"}
            size={"sm"}
        >
            {isPublished? "Unpublish":"Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
            <Button size={"sm"} disabled={isLoading}>
                <Trash className="h-4 w-4"/>
            </Button>
        </ConfirmModal>
    </div>
  )
}

export default Actions