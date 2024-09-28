import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    {params}:{params:{eventId:string}}
){
    try{
        const {userId} = auth();
        const {url} = await req.json();
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
        const attachment = await db.attachment.create({
            data:{
                url,
                name:url.split("/").pop(),
                eventId:params.eventId
            }
        })
        return NextResponse.json(attachment)

    }catch(error){
        console.log("EVENT_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", {status:500})
    }
}