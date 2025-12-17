import axios from "axios";
export const config = {
  name: "pingDiscord",
  type: "event",
  description: "Sends the message to the discord channel",
  subscribes: ["discord-notifier"],
  emits: [],
  flows: ["github-discord-sync"],
};

export const handler = async (input, {logger}) => {
  logger.info("Inside the discord handler");
  try {
    const discord_url = process.env.DISCORD_WEBHOOK_URL;
    const response = await axios.post(discord_url, {
        content : input.message
    })
    if(response.status !== 204) {
        return {status : 500, message : "Message not posted on discord"}
    }

    logger.info("Succesfully pinged Discord with message " + input.message);
    return {status : 200, ok : true}
  } catch (e) {
    logger.error(JSON.stringify(e, null, 2));
    return { status: 500, message: "Some error occured" };
  }
};