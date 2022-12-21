export const validateEnv = (value: string | undefined, key: string) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} not set but required.`);
  }

  return value;
};
