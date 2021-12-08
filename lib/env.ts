export const env = (key: string) => {
  const value = Deno.env.get(key);

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};
