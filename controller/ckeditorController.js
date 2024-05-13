const History = require("../model/HistoryModel");
const ApiDocs = require("../model/ckdualEditorModel");

const addApi = async (req, res) => {
  try {
    const { sections, fields, subsections } = req.body;
    if (!sections || !fields) {
      return res
        .status(400)
        .json({ message: " Section and Field are required field " });
    }
    const newDoc = new ApiDocs({
      sections,
      subsections,
      fields,
    });
    await newDoc.save();
    res.status(201).json({ message: "succsesfully added", data: newDoc });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getApiDocs = async (req, res) => {
  try {
    const apiDocs = await ApiDocs.find();
    res.status(200).json({ message: "succsesfully fetched", data: apiDocs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApiDocs = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the document
    const originalDoc = await ApiDocs.findById(id);
    if (!originalDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Calculate changes and prepare the document for update
    const changes = calculateChanges(originalDoc, req.body, req.user._id);
    if (changes.length > 0) {
      // Apply updates and save
      Object.assign(originalDoc, req.body);
      await originalDoc.save();

      // Log changes to the history collection
      await History.insertMany(changes);

      res
        .status(200)
        .json({ message: "Successfully updated", data: originalDoc, changes });
    } else {
      res.status(200).json({ message: "No changes made", data: originalDoc });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .json({ message: "Error updating document", error: error.message });
  }
};

function calculateChanges(originalDoc, updatedDoc, userId) {
  const originalData = originalDoc.toObject(); // Convert Mongoose doc to plain object
  const changes = [];

  Object.keys(updatedDoc).forEach((key) => {
    if (JSON.stringify(originalData[key]) !== JSON.stringify(updatedDoc[key])) {
      changes.push({
        docId: originalDoc._id,
        fieldName: key,
        oldValue: originalData[key],
        newValue: updatedDoc[key],
        updatedBy: userId,
        updatedAt: new Date(),
      });
    }
  });

  return changes;
}

module.exports = { addApi, getApiDocs, updateApiDocs };
