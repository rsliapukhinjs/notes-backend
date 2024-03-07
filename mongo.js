const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password as argument");
}

const password = process.argv[2];

const url = `mongodb+srv://rsliapukhinjs:${password}@cluster0.bs3lgww.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "CSS is hard",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("Note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => console.log(note));

  mongoose.connection.close();
});
