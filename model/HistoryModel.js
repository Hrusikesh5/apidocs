const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  docId: { type: Schema.Types.ObjectId, ref: "ApiDocs", required: true },
  fieldName: { type: String, required: true },
  oldValue: { type: Schema.Types.Mixed, required: true },
  newValue: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String, required: true },
});
const History = mongoose.model("History", HistorySchema);
module.exports = History;
