const mongoose = require("mongoose");

const dnsSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: [true, "Please provide a domain name"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Please provide a DNS record type"],
      enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA"],
      uppercase: true,
    },
    value: {
      type: String,
      required: [true, "Please provide a DNS record value"],
      trim: true,
    },
    ttl: {
      type: Number,
      default: 3600, // 1 hour
      min: [60, "TTL must be at least 60 seconds"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true }
);

// Index for faster queries
dnsSchema.index({ domain: 1, userId: 1 });

module.exports = mongoose.model("DNS", dnsSchema);