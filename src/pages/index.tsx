import  Head  from "next/head";
import React from "react";
import { GetServerSideProps } from 'next';

import  {ChallengesProvider} from "../contexts/ChallengesContext";
import ChallengesBox from "../components/ChallengesBox";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdow";
import { ExperienceBar } from "../components/Experiencebar";
import  Profile from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challangesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (

    <ChallengesProvider
     level={props.level}
    currentExperience={props.currentExperience}
    challangesCompleted={props.challangesCompleted}>

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

    </ChallengesProvider >
  );
}



export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const {level, currentExperience, challangesCompleted} = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challangesCompleted: Number(challangesCompleted)
    }
  }
}







