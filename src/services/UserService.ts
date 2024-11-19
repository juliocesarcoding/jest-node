import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
 const hasUser = await User.findOne({ where: { email } });
 if (!hasUser) {
  const hash = bcrypt.hashSync(password, 10);
  const user = await User.create({ email, password: hash });
  return user;
 } else {
  return new Error("E-mail already exists.");
 }
};

export const findByEmail = async (email: string) => {
 return await User.findOne({ where: { email } });
};

export const matchPassword = (passwordText: string, passwordHash: string) => {
 return bcrypt.compareSync(passwordText, passwordHash);
};

export const all = async () => {
 return await User.findAll();
};
