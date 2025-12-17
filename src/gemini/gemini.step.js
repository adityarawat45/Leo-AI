import "dotenv/config"
import { GoogleGenAI } from "@google/genai";
import {format } from "../helpers/formatHelper.js";

const ai = new GoogleGenAI({"apiKey" : process.env.GEMINI_KEY});

async function generateMessage(content) { 
  try {
    const prompt = `Here's a json object which contains data recieved from an event triggered from github webhooks. Just generate a cool message which should be meaningful with the details provided. Content : " ${JSON.stringify(content, null, 2)}. Use this sample format, but feel free to modify according to details as this is just a sample format : ${format}. I need to post this message on discord. Don't give me any other stuff Just the message that needs to be moved forward and observe the content details carefully`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,

    });

    if(response.text) {
      console.log("Response from gemini : " + response.text)
      return {status : 200, message : response.text}
    }
      return {status : 400, message : "Some error occured"}
  } catch(err) {
    console.log("Error occured", err);
    return {status : err?.error?.code || 500, message : err?.error?.message || "Please try later"}
  }
}

export const config = {
  name: 'generateNotificationContent',
  type: 'event',
  description: 'Generates message through GEMIN with the data received from github',
  subscribes: ['generate-notification-content'],
  emits: ['discord-notifier'],
  flows: ['github-discord-sync'],
};

export const handler = async (input, { logger, state , emit}) => {
  logger.info("Inside gemini handler, input : " + JSON.stringify(input, null, 2))
  try {
    const response = await generateMessage(input);
    console.log("response : " + response);
    if(response.status !== 200) {
      return ({status : response.status, ok : false})
    }
    await emit({
      topic : "discord-notifier",
      data : {
        message : response.text
      }
    })
    logger.info("Message generated succesfully");
    return ({status : 200, ok : true})

  } catch(error) {
    logger.error("Some unexpected error occured");
  }
}