import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [goldQueryInput, setGoldQueryInput] = useState("");
  const [result, setResult] = useState();
  const [output, setOutput] = useState();
  const [goldQuery, setGoldQuery] = useState();
  const [codex, setCodexSelected] = useState(false);
  const [gptDavinci, setGptDavinci] = useState(false);
  const [gptCurie, setGptCurie] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    console.log("codex, davinci, curie " + codex + " , " + gptDavinci + " , " + gptCurie)
    let model;
    if (codex == true) {
        model = "code-davinci-002"
    }
    else if (gptDavinci == true) {
        model = "text-davinci-003"
    }
    else if (gptCurie == true) {
        model = "text-curie-001"
    }
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryInput, langModel: model }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  async function executeQuery(event) {
  console.log("executeQuery method started: " + result)
  event.preventDefault();
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: result , goldQuery: goldQueryInput}),
        });
      const data = await response.json();
      console.log(data)
      setOutput(data.result);
      }

const handleCheckedStateCodex = () => {
    setCodexSelected(!codex);
  };
const handleCheckedStateGPTDavinci = () => {
    setGptDavinci(!gptDavinci);
  };
const handleCheckedStateGptCurie = () => {
    setGptCurie(!gptCurie);
  };

  return (
    <div>
      <Head>
        <title>Text to SQL translator</title>
        <link rel="icon" href="/img.png" />
      </Head>

      <main className={styles.main}>
        <img src="/img.png" className={styles.icon} />
        <h3>Text to SQL Translator</h3>
        <form onSubmit={onSubmit}>
        <label htmlFor="codex">
           <input type="checkbox" id="codex" name="codex" value="yes" checked={codex}
           onChange={handleCheckedStateCodex}/>  Codex Davinci
        </label>
        <label htmlFor="gptDavinci">
                   <input type="checkbox" id="gptDavinci" name="gptDavinci" value="yes"  checked={gptDavinci}
                   onChange={handleCheckedStateGPTDavinci}/>  GPT3 - text-davinci-003
        </label>
        <label htmlFor="gptBabbage">
                   <input type="checkbox" id="gptBabbage" name="gptBabbage" value="yes" checked={gptCurie}
                   onChange={handleCheckedStateGptCurie}/>  GPT3 - text-curie-001
        </label>
          <textarea className={styles.text}
            type="text"
            name="animal"
            placeholder="Enter table schema and question"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <input className={styles.submitBtn} type="submit" value="Generate SQL Query" />
        </form>
      </main>
      <textarea className={styles.predictedText}
                                type="text"
                                placeholder="Predicted query"
                                name="animal" readOnly
                                value={result}
                              />
                                    <input className={styles.evaluateBtn} onClick={executeQuery} type="submit" value="Evaluate Query" hidden={result == null}/>

      <textarea className={styles.goldText}
                  type="text"
                  name="animal"
                  placeholder="Enter Gold query"
                  value={goldQueryInput}
                  onChange={(e) => setGoldQueryInput(e.target.value)}
                />
      <main className={styles.boxResults} hidden={result == null}>
      <ul hidden={result == null}>
      <li>
      <h4 hidden={result == null}>Is SQL Valid : {output?.validity} {output?.error}</h4>
      </li>
      <li hidden={result == null}><h4>Execution Accuracy : {output?.accuracy} %</h4>
      </li>
      </ul>
      </main>
    </div>
  );
}
