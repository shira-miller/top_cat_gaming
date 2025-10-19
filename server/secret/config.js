import dotenv from "dotenv";
dotenv.config();

export const userDB = process.env.USER_DB;
export const passDB = process.env.PASS_DB;
export const tokenSecret = process.env.TOKEN_SECRET;
export const port = process.env.PORT;
