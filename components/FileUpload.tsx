"use client";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps{
    onChange:(url?:string)=>void;
    endpoint:keyof typeof ourFileRouter;
}
export const FileUpload=({onChange,endpoint}:FileUploadProps)=>{
    const {toast} = useToast();
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res)=>{
                onChange(res?.[0].url)
            }}
            onUploadError={(error:Error)=>{
                toast({
                    variant: "destructive",
                    title: "Something Went Wrong",
                  })
            }}
        />
    )
}
 
