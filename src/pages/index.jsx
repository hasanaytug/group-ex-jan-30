import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { retext } from "retext";
import retextPos from "retext-pos";
import retextKeywords from "retext-keywords";
import { toString } from "nlcst-to-string";
import { setConstantValue } from "typescript";

export default function Home() {
  const inputRef = useRef();
  const [data, setData] = useState([]);

  const getKeywords = async (text) => {
    let keywords = [];
    let v1 = await retext().use(retextPos).use(retextKeywords).process(text);

    v1.data.keywords.forEach((keyword) => {
      keywords.push(toString(keyword.matches[0].node));
    });

    return keywords;
  };

  useEffect(() => {
    data.length !== 0
      ? localStorage.setItem("keywordItems", JSON.stringify(data))
      : null;
  }, [data]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("keywordItems"));

    if (localData !== null) {
      setData(localData);
    }
  }, []);

  const handleInput = async (e) => {
    const keywords = await getKeywords(inputRef.current.value);
    setData([
      ...data,
      {
        text: inputRef.current.value,
        keywords: keywords,
        time: new Date(Date.now),
      },
    ]);
  };
  return (
    <div>
      <textarea placeholder="input here" ref={inputRef}></textarea>
      <button onClick={handleInput}>Get Keywords</button>
      <Posts data={data}></Posts>
    </div>
  );
}

function Posts({ data }) {
  return data.map((t) => (
    <div>
      <p>{t.text}</p>
      <p>{t.keywords}</p>
    </div>
  ));
}
