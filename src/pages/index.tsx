import  Head  from "next/head";
import React from "react";
import ChallengesBox from "../components/ChallengesBox";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdow";
import { ExperienceBar } from "../components/Experiencebar";
import  Profile from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
     <ExperienceBar />
     <Head>
       <title>Inicio | move.it</title>
     </Head>
     <CountdownProvider>
        <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
             </div>
             <div>
                <ChallengesBox />
             </div>
        </section>
     </CountdownProvider>
    </div>
  );
}
