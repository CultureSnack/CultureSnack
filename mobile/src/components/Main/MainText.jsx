import React from "react";
import styles from "./MainText.module.css";

export const MainText = () => (
    <div>
        <div className={styles.cultureReimagined}>
            Culture, reimagined in the language of Gen Z.
        </div>
        <div className={styles.lessJargon}>
            Less jargon, more clarity.
        </div>
        <div className={styles.aiReads}>
            AI reads it. We tell it simply.
        </div>
    </div>
);