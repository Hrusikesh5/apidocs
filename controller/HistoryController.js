const History = require("../model/HistoryModel");

const getHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const historyRecords = await History.find({ docId: id }).sort({
      updatedAt: -1,
    });
    res.status(200).json({
      message: "History records retrieved successfully",
      data: historyRecords,
    });
  } catch (error) {
    console.error("Error retrieving history records:", error);
    res.status(500).json({
      message: "Failed to retrieve history records",
      error: error.message,
    });
  }
};

module.exports = { getHistory };
