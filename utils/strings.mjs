import bcrypt from "bcrypt";

export const hashString = async (string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(string, salt);
};

export const compareString = async (string, hash) => {
  return await bcrypt.compare(string, hash);
};
