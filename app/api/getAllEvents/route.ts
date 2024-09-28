import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";




export async function GET(req:Request){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const events = await db.schoolEvent.findMany({
            where:{
                userId,
                isPublished:true

            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(events)
    }catch(error){
        console.log("[GET_ALL_EVENTS]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  