"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
  })
const CreateEventPage = () => {
    const { toast } = useToast()
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
      })

      const {isSubmitting, isValid} = form.formState;
      async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            const response = await axios.post("/api/event",values);
            console.log(response)
            router.push(`/create/${response.data.id}`)
            toast({
              variant:"success",
              title: "Success",
              description: "Event Title Created",
            })
        }catch{
          toast({
            variant: "destructive",
            title: "Something Went Wrong",
            description: "There was a problem with your request.",
          })
        }
        console.log(values)
      }
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
            <h1 className="text-2xl">
                Name the event
            </h1>
            <p className="text-sm text-slate-500">
                What would you like to name this event? Don&apos;t worry, you can change this later.
            </p>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input
                    disabled={isSubmitting} 
                    placeholder="e.g. 'Krishna Janmashtmi'" 
                    {...field} 
                />
              </FormControl>
              <FormDescription>
                What will you like to name this event? Don't worry, you can change this later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Link href={"/"}>
            <Button
                type="button"
                variant="ghost"
            >
                Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            disabled={!isValid || isSubmitting}
          >
            Submit
        </Button>
        </div>
       
      </form>
    </Form> 
        </div>
    </div>
    
  )
}

export default CreateEventPage