import mongoose from "mongoose";

const UserShema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please Provide Your Full Name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a password"],
      minlenght: [6, "Password must be at least 6 characters"],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserShema);
