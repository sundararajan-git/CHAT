import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log("Mongo DB Connected ✅ " + conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
