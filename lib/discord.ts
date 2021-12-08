import { env } from "./env.ts";

const WEBHOOK_URL = env("DISCORD_WEBHOOK");

export const notifyChannel = async (content: string) => {
  await fetch(
    WEBHOOK_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );
};

export const formatCodeblock = (content: string) => {
  return `\`\`\`${content}\`\`\``;
};
