function trackHistory(req, res, next) {
  const originalSend = res.send;
  res.send = function (data) {
    if (res.statusCode === 200 && req.method === "PATCH") {
      const changes = calculateChanges(req.originalDoc, req.body, req.user._id);
      if (changes.length > 0) {
        History.insertMany(changes)
          .then(() => {
            originalSend.call(this, data);
          })
          .catch((err) => {
            console.error("Failed to save history:", err);
            res.status(500).json({ message: "Failed to save history" });
          });
      } else {
        originalSend.call(this, data);
      }
    } else {
      originalSend.call(this, data);
    }
  };
  next();
}

function calculateChanges(originalDoc, updatedDoc, userId) {
  const changes = [];
  Object.keys(updatedDoc).forEach((key) => {
    if (JSON.stringify(originalDoc[key]) !== JSON.stringify(updatedDoc[key])) {
      changes.push({
        docId: originalDoc._id,
        fieldName: key,
        oldValue: originalDoc[key],
        newValue: updatedDoc[key],
        updatedBy: userId,
        updatedAt: new Date(),
      });
    }
  });
  return changes;
}

module.exports = trackHistory;
