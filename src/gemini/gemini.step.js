import "dotenv/config"
import { GoogleGenAI } from "@google/genai";
import {format } from "../helpers/formatHelper.js";

const ai = new GoogleGenAI({"apiKey" : process.env.GEMINI_KEY});

async function generateMessage(content) {
  let prompt = `Here's a json object which contains data recieved from an event triggered from github webhooks. Just generate a cool message which should be meaningful with the details provided. Content : " ${JSON.stringify(content, null, 2)}. Use this sample format, but feel free to modify according to details as this is just a sample format : ${format}. I need to post this message on discord. Don't give me any other stuff Just the message that needs to be moved forward and observe the content details carefully`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,

  });
  if(response.text) {
    console.log(response.text);
  }
  
}

const content = {
  "action": "opened",
  "number": 42,
  "title": "Login fails on Safari browser",
  "state": "open",
  "body": "Users are unable to log in when using Safari. The login button becomes unresponsive after entering credentials.",
  "html_url": "https://github.com/aditya/leo/issues/42",
  "labels": [
    {
      "id": 101,
      "name": "bug"
    },
    {
      "id": 102,
      "name": "high-priority"
    }
  ],
  "assignees": [
    {
      "login": "aditya",
      "id": 501
    }
  ],
  "created_at": "2025-01-12T09:15:30Z",
  "updated_at": "2025-01-12T10:02:10Z",
  "closed_at": null,
  "repo_name": "aditya/leo",
  "actor": "octocat"
}


generateMessage(content)

// export const config = {
//   name: 'generateNotificationContent',
//   type: 'event',
//   description: 'Generates message through GEMIN with the data received from github',
//   subscribes: ['generate-notification-content'],
//   emits: [],
//   // input: inputSchema,
//   // flows: ['github-notion-sync'],
// };

// export const handler = async (input, { logger, state }) => {
//   try {
//     const content = input.data;
//     const response = await generateMessage(content);
//     return response.text;

//   } catch(error) {
//     logger.error("Some unexpected error occured");
//   }
// }