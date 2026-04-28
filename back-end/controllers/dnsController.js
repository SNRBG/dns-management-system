const DNS = require("../models/DNS");

exports.createRecord = async (req, res, next) => {
  try {
    const { domain, type, value, ttl, priority } = req.body;

    // Validation
    if (!domain || !type || !value) {
      return res
        .status(400)
        .json({ error: "Domain, type, and value are required" });
    }

    if (!["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA"].includes(type)) {
      return res.status(400).json({ error: "Invalid DNS record type" });
    }

    // Check if record already exists
    const existingRecord = await DNS.findOne({ domain, type });
    if (existingRecord) {
      return res
        .status(400)
        .json({ error: "DNS record with this domain and type already exists" });
    }

    // Create record with user association
    const record = await DNS.create({
      domain: domain.toLowerCase(),
      type: type.toUpperCase(),
      value,
      ttl: ttl || 3600,
      priority: priority || 10,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "DNS record created successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    const { domain, type } = req.query;

    // Build filter
    const filter = { userId: req.user.id };
    if (domain) filter.domain = domain.toLowerCase();
    if (type) filter.type = type.toUpperCase();

    const records = await DNS.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      count: records.length,
      records,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.getRecordById = async (req, res, next) => {
  try {
    const record = await DNS.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!record) {
      return res.status(404).json({ error: "DNS record not found" });
    }

    res.status(200).json({
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const { value, ttl, priority } = req.body;

    if (!value && !ttl && !priority) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided for update" });
    }

    const record = await DNS.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!record) {
      return res.status(404).json({ error: "DNS record not found" });
    }

    if (value) record.value = value;
    if (ttl) record.ttl = ttl;
    if (priority) record.priority = priority;

    await record.save();

    res.status(200).json({
      message: "DNS record updated successfully",
      record,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await DNS.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!record) {
      return res.status(404).json({ error: "DNS record not found" });
    }

    await DNS.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "DNS record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};