import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}:{params:{eventId:string, attachmentId:string}}
){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized", {status:401})
        }
        const eventOwner = await db.schoolEvent.findUnique({
            where:{
                id:params.eventId,
                userId:userId
            }
        })
        if(!eventOwner){
            return new NextResponse("Unauthorized", {status:401})
        }
        const attachment = await db.attachment.delete({
            where:{
                eventId:params.eventId,
                id:params.attachmentId
            }
        })
        return NextResponse.json(attachment)

    }catch(error){
        console.log("ATTACHEMNT_ID_DELETE", error);
        return new NextResponse("Internal Error", {status:500})
    }
}