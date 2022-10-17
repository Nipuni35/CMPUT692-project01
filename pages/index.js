import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const [result, setResult] = useState();

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
          <input
            type="text"
            name="animal"
            placeholder="Enter table schema and question"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <input type="submit" value="Generate SQL Query" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
