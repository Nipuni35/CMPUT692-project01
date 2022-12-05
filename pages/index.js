import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [goldQueryInput, setGoldQueryInput] = useState("");
  const [result, setResult] = useState();
  const [output, setOutput] = useState();
  const [goldQuery, setGoldQuery] = useState();
  const [codex, setCodexSelected] = useState();
  const [gptDavinci, setGptDavinci] = useState();
  const [gptCurie, setGptCurie] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    console.log("codex, davinci, curie " + codex + " , " + gptDavinci + " , " + gptCurie)
    let model = "code-davinci-002";
    if (codex) {
        model = "code-davinci-002"
    }
    if (gptDavinci) {
        model = "text-davinci-003"
    }
    if (gptCurie) {
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


  return (
    <div>
      <Head>
        <title>Text to SQL translator</title>
        <link rel="icon" href="/img.png" />
      </Head>

      <main className={styles.main}>
        <img src="/img.png" className={styles.icon} />
        <h3>Text to SQL translator</h3>
        <form onSubmit={onSubmit}>
        <label htmlFor="codex">
           <input type="checkbox" id="codex" name="codex" value="yes"
           onChange={(e) => setCodexSelected(e.target.value)}/>  Codex Davinci
        </label>
        <label htmlFor="gptDavinci">
                   <input type="checkbox" id="gptDavinci" name="gptDavinci" value="yes"
                   onChange={(e) => setGptDavinci(e.target.value)}/>  GPT3 - text-davinci-003
        </label>
        <label htmlFor="gptBabbage">
                   <input type="checkbox" id="gptBabbage" name="gptBabbage" value="yes"
                   onChange={(e) => setGptCurie(e.target.value)}/>  GPT3 - text-curie-001
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
