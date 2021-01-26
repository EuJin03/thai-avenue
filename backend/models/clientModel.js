import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
