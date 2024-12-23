import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log(conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
