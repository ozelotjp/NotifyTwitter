import { encode } from "https://deno.land/std/encoding/base64.ts";
import { env } from "./env.ts";

const TWITTER_TOKEN = env("TWITTER_TOKEN");

const getUsersShow = async (screen_name: string) => {
  const res = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${screen_name}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${TWITTER_TOKEN}`,
      },
    },
  );

  if (!res.ok) {
    console.error(res);
    throw new Error("Request Error");
  }

  const result = await res.json();
  return result;
};

export const getProfile = async (screen_name: string) => {
  const data = await getUsersShow(screen_name);

  return {
    name: data.name,
    description: data.description,
    location: data.location,
    profile_image_url: data.profile_image_url,
    banner_url: data.profile_banner_url,
  };
};
