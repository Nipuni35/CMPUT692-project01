import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [result, setResult] = useState();
  const [goldQuery, setGoldQuery] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryInput }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  async function executeQuery(event) {
  console.log("executeQuery method started: " + result)
    if (result !== undefined && result !== NULL) {
    event.preventDefault();
    const response = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: result }),
    });
  }
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
           <input type="checkbox" id="codex" name="codex" value="yes"/>  Codex Davinci
        </label>
        <label htmlFor="gptDavinci">
                   <input type="checkbox" id="gptDavinci" name="gptDavinci" value="yes"/>  GPT3 - text-davinci-003
        </label>
        <label htmlFor="gptBabbage">
                   <input type="checkbox" id="gptBabbage" name="gptBabbage" value="yes"/>  GPT3 - text-babbage-002
        </label>
          <textarea className={styles.text}
            type="text"
            name="animal"
            placeholder="Enter table schema and question"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <input type="submit" value="Generate SQL Query" />
              <input onClick={executeQuery} type="submit" value="Execute Query" />


        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <main className={styles.main}>
      <ul>
      <li>
      <h4>Is SQL Valid :</h4>
      </li>
      <li><h4>Execution Accuracy :</h4>
      </li>
      </ul>
      </main>
    </div>
  );
}
