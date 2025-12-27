import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerKg: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerItem: {
      type: Number,
      required: true,
      min: 0,
    },
    processingTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

export default Service;
