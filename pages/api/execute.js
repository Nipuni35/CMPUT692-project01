import { Configuration, OpenAIApi } from "openai";
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { PythonShell } from 'python-shell'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res1) {

    console.log("execute method started " + req.body.query + " & " + req.body.goldQuery)
    let options = {
        scriptPath: "D:/Alberta/CMPUT692/project/open-api-project/CMPUT692-project01/pages/api/",
        args: [req.body.goldQuery, req.body.query]
    }
    PythonShell.run("main.py", options, (err, res) => {
    if (err) console.log(err);
    if (res) {console.log("python script result: " + res);
    const executionOutput = {
        validity: true,
        goldRes: null,
        predictedRes: null,
        accuracy: 0.0,
        error: null
    }
        if (res[0].includes('Validity :')) {
        executionOutput.validity = res[0].replace('Validity :', '')
        }
        if (res[1].includes('GoldRes :')) {
        executionOutput.goldRes = res[1].replace('GoldRes :', '')
        }if (res[2].includes('PredictionRes :')) {
        executionOutput.predictedRes = res[2].replace('PredictionRes :', '')
        }if (res[3].includes('accuracy :')) {
        executionOutput.accuracy = res[3].replace('accuracy :', '')
        }
        if (res[4].includes('error :')) {
        executionOutput.error = '(' + res[4].replace('error :', '') + ')'
        }
        return res1.status(200).json({ result: executionOutput })
    }
    });
}