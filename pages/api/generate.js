import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    console.log("generate method started, with model", req.body.langModel)
    const response = await openai.createCompletion({
            model: req.body.langModel,
            prompt: generatePrompt(req.body.query),
            temperature: 0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["#", ";"],
    });
    const generatedSql = 'SELECT ' + response.data.choices[0].text;
    return  res.status(200).json({ result: generatedSql });
}

function generatePrompt(query) {
  const prompt = query;
  console.log(prompt);
  return prompt;
}