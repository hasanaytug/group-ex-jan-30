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

export default function Home() {
  return (
    <div>
      <textarea placeholder="input here"></textarea>
      <button>Get Keywords</button>
    </div>
  );
}
