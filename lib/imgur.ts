import { env } from "./env.ts";

const CLIENT_ID = env("IMGUR_ID");
const CLIENT_SECRET = env("IMGUR_SECRET");

export const uploadImage = async (url: string) => {
  const response = await fetch(
    `https://api.imgur.com/3/image/`,
    {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `image=${url}`,
    },
  );
  const json = await response.json();
  return json.data.link;
};
