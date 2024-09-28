import { PrismaClient } from '@prisma/client'
const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data:[
                {name:"Image"},
                {name:"Video"},
                {name:"Article"},
            ]
        })
        console.log("success")
    }catch(error){
        console.log("Error seeding the database categories",error)
    }finally{
        await database.$disconnect();
    }
}

main();