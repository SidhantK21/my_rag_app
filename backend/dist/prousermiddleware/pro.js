"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const provefication = async () => {
    const userEmail = "abc@gmail.com";
    const subscribedStatus = await client.user.findUnique({
        where: {
            email: userEmail,
            subscribed: true
        }
    });
    if (!subscribedStatus) {
        console.log("Pro not verified");
    }
    // then redirect it to the payment gateway or show a pop up to make paymet first 
    console.log(subscribedStatus);
};
provefication();
