import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export { User, IUser };
