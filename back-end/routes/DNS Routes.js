const router = require("express").Router();
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require("../controllers/dnsController");
const { authenticate } = require("../middleware/auth");

// All DNS routes require authentication
router.use(authenticate);

router.post("/", createRecord);
router.get("/", getRecords);
router.get("/:id", getRecordById);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

module.exports = router;