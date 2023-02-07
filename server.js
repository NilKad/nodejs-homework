const app = require("./app");
const mongoose = require("mongoose");

const fs = require("fs/promises");

const { DB_HOST, PORT, TEMP_DIR } = process.env;

console.log("DB_HOST: ", DB_HOST);
mongoose.set("strictQuery", true);

const isAcceessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAcceessible(folder))) {
    await fs.mkdir(folder);
  }
};

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      createFolderIsNotExist(TEMP_DIR);
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// console.log(mongoose.find({}));

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
