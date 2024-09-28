import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    try{
        const {userId} = auth();
        const {title} = await req.json();
      
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const schoolEvent = await db.schoolEvent.create({
            data:{
                userId,
                title
            }
        })
        return NextResponse.json(schoolEvent)
    }catch(error){
        console.log("[SCHOOL_EVENT_CREATION]",error);
        return new NextResponse("Internal Error",{status:500})
    }
} 


export async function GET(req:Request){
    try{
        const {userId} = auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const events = await db.schoolEvent.findMany({
            where:{
                userId,
                category:{
                    name:'Video'
                },
                isPublished:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(events)
    }catch(error){
        console.log("[GET_EVENTS]",error);
        return new NextResponse("Internal Error",{status:500})
    }
}  