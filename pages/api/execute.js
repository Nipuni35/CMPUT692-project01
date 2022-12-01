import { Configuration, OpenAIApi } from "openai";
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    console.log("execute method started " + req.body.query)
    let db = new sqlite3.Database("D:/installs/sqlite3/assignment02db.db", (err) => {
        if (err){
            return console.error(err.message);
        }
    console.log('Connected to the in-memory SQlite database.');
    });
      db.each(req.body.query,
       (err, rows) => {
        if (err) {
          console.error(err.message);
          output = "Invalid SQL detected";
        }
        else {
            console.log(rows);
        }
    });

    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
    return  res.status(200).json({ result: output });

}