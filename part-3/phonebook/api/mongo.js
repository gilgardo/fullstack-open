// Ex: 3.12

import mongoose from "mongoose";
import "dotenv/config";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const [password, name, number] = process.argv.slice(2);

const url = `mongodb+srv://${process.env.DATABASE_USER}:${password}@cluster0.ywjhnyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({ name, number });

  try {
    await person.save();
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
} else {
  try {
    Person.find({}).then((result) => {
      result.forEach((el) => {
        console.log(el);
      });
      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
}
