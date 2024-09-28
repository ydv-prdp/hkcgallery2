'use client'
import { db } from "@/lib/db"
import CategoriesPage from "./_components/CategoriesPage"
import { getCourses } from "@/actions/get-courses"
import { auth } from "@clerk/nextjs/server"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import EventsList from "@/components/events-list"
import { SchoolEvent } from "@prisma/client"

const SearchPage = () => {
  const [data, setData] = useState<SchoolEvent[]>([])
  const [isLoading, setLoading] = useState(true)
  const { userId} = useAuth()


  useEffect(() => {
    fetch('/api/videoevent')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No Video Events To Show</p>
  
  if(!userId){
    return redirect("/")
  }

  
  return (
      <div className="w-full max-w-screen-xl mx-auto p-6 space-y-4">  
      
        <EventsList 
          items={data}
        />
      </div>
  )
}

export default SearchPage