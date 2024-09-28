import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params: {eventId:string;}}
){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        
        const ownEvent = await db.schoolEvent.findUnique({
            where:{
                id:params.eventId,
                userId:userId
            }
        })
        if(!ownEvent){
            return new NextResponse("Unauthorized",{status:404})
        }

       
       const unpublishedEvent = await db.schoolEvent.update({
        where:{
            id:params.eventId,
            userId,
        },
        data:{
            isPublished:false
        }
       })
       return NextResponse.json(unpublishedEvent)
       
      
    }catch (error){
        console.log("[EVENT_ID_UNPUBLISH]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}