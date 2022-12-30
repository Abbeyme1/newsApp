const { Datastore } = require("@google-cloud/datastore");

const db = new Datastore({
  projectId: "newsapp-373005",
  keyFilename: "./google.json",
});

const saveData = async (kind, id, data) => {
  const taskKey = db.key([kind, id]);

  const task = {
    key: taskKey,
    data,
  };

  return await db
    .save(task)
    .then(() => task.data)
    .catch((err) => err);
};

module.exports = db;
module.exports.saveData = saveData;
