import React from "react";
import styles from "./CultureSnackMain.module.css";
import { MainText } from "../components/MainText";
import { Slogan } from "../components/Slogan";
import { CultureSnackLogo } from "../components/CultureSnackLogo";
import { MainImages } from "../components/MainImages";
import { Divider } from "../components/Divider";
import { ArrowBack } from "../components/ArrowBack/ArrowBack";

export const CultureSnackMain = ({ className = "" }) => (
    <div className={`${styles.cultureSnackMain} ${className}`}>
        <MainText />
        <Slogan />
        <CultureSnackLogo />
        <MainImages />
        <Divider />
        <ArrowBack className={styles.arrowBackInstance} />
    </div>
);