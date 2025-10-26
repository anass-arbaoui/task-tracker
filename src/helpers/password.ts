// 2 functions : hashing et la comparaison des mots de passe  :
import bcrypt from "bcrypt";
export const hashPassword = async (password: string) => {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
