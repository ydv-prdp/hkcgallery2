import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,{params}:{params:{eventId:string}}){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const deletedEvent = await db.schoolEvent.delete({
            where:{
                id:params.eventId
            }
        })
        return NextResponse.json(deletedEvent)
    }catch(error){
        console.log("[EVENT_ID_DELETE]",error);
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function PATCH(req:Request,{params}:{params:{eventId:string}}){
    try{
        const {userId} = auth();
        const {eventId} = params;
        const values = await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const schoolEvent = await db.schoolEvent.update({
           where:{
            id:eventId,
            userId
           },
           data:{
            ...values
           }
        })
        return NextResponse.json(schoolEvent)
    }catch(error){
        console.log("[EVENT_ID_UPDATE]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}