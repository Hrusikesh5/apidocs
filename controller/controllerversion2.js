const ApiDocs = require("../model/ckdualEditorModel");

const addApi2 = async (req, res) => {
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

const getApiDocs2 = async (req, res) => {
  try {
    const apiDocs = await ApiDocs.find();
    res.status(200).json({ message: "succsesfully fetched", data: apiDocs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateApiDocs2 = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await ApiDocs.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updateApiDocs) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "succsesfully updated", data: updatedDoc });
  } catch (error) {
    console.error("Error updating document", error);
    res.status(400).json({ message: "Error updating document" });
  }
};

module.exports = { addApi2, getApiDocs2, updateApiDocs2 };
