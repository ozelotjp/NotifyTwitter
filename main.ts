import { formatCodeblock, notifyChannel } from "./lib/discord.ts";
import { env } from "./lib/env.ts";
import { uploadImage } from "./lib/imgur.ts";
import { getProfile } from "./lib/twitter.ts";

const SCREEN_NAME = env("SCREEN_NAME");

let latest = {
  first: true,
  name: "",
  description: "",
  location: "",
  profile_image_url: "",
  banner_url: "",
};

const watch = async () => {
  const profile = await getProfile(SCREEN_NAME);

  if (latest.first) {
    console.log("First run");
    latest = { first: false, ...profile };
  }

  // 名前
  if (profile.name !== latest.name) {
    console.log("Found Change", "名前", profile.name);

    await notifyChannel(`名前\n${formatCodeblock(profile.name)}`);
    latest.name = profile.name;
  }
  // 自己紹介
  if (profile.description !== latest.description) {
    console.log("Found Change", "自己紹介", profile.description);

    await notifyChannel(`自己紹介\n${formatCodeblock(profile.description)}`);
    latest.description = profile.description;
  }
  // 場所
  if (profile.location !== latest.location) {
    console.log("Found Change", "場所", profile.location);

    await notifyChannel(`場所\n${formatCodeblock(profile.location)}`);
    latest.location = profile.location;
  }
  // プロフィール画像
  if (profile.profile_image_url !== latest.profile_image_url) {
    console.log("Found Change", "プロフィール画像", profile.profile_image_url);

    const url = await uploadImage(
      profile.profile_image_url.replace("_normal", ""),
    );

    await notifyChannel(`プロフィール画像\n${url}`);
    latest.profile_image_url = profile.profile_image_url;
  }
  // バナー画像
  if (profile.banner_url !== latest.banner_url) {
    console.log("Found Change", "バナー画像", profile.banner_url);

    const url = await uploadImage(profile.banner_url);

    await notifyChannel(`バナー画像\n${url}`);
    latest.banner_url = profile.banner_url;
  }
};
const main = async () => {
  console.log("Exec", new Date());

  try {
    await watch();
  } catch (e) {
    console.error(e);
  }

  console.log("---");
};

setInterval(async () => await main(), 60 * 1000);
await main();
