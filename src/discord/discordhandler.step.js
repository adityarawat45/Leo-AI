export const config = {
  name: "pingDiscord",
  type: "event",
  description: "Sends the message to the discord channel",
  subscribes: ["discord-notifier"],
  emits: [],
  // input: inputSchema,
  flows: ["github-discord-sync"],
};

export const handler = async (req, { input, emit, state, logger }) => {
  try {
    logger.info("Inside the discord handler");
    return { status: 200, message: "Nothing" };
  } catch (e) {
    logger.error(e);
    return { status: 400, message: "Some error occured" };
  }
};
