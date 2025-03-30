import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

type PaymetToken=string;
type Verification=boolean;

const provefication= async ()=>{
    const userEmail="abc@gmail.com";
    const subscribedStatus=await client.user.findUnique({
        where:{
            email:userEmail,
            subscribed:true
        }
    })
    if(!subscribedStatus)
    {
        console.log("Pro not verified");
    }
    // then redirect it to the payment gateway or show a pop up to make paymet first 
    console.log(subscribedStatus);
}


provefication();