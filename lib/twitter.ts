import { encode } from "https://deno.land/std/encoding/base64.ts";
import { env } from "./env.ts";

const CONSUMER_KEY = env("TWITTER_KEY");
const CONSUMER_SECRET = env("TWITTER_SECRET");

const getToken = async () => {
  const response = await fetch(`https://api.twitter.com/oauth2/token`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${encode(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    console.error(response);
    throw new Error("Authorization Error");
  }

  const result = await response.json();
  return result.access_token;
};

const getUsersShow = async (token: string, screen_name: string) => {
  const res = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${screen_name}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
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
  const token = await getToken();
  const data = await getUsersShow(token, screen_name);

  return {
    name: data.name,
    description: data.description,
    location: data.location,
    profile_image_url: data.profile_image_url,
    banner_url: data.profile_banner_url,
  };
};
