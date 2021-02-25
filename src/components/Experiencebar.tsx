import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";


export function ExperienceBar() {

    const { currentExperience, experrienceToNextLevel} = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) /  experrienceToNextLevel;


    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentToNextLevel}%`}} />

                <span className={styles.currenceExperience} style={{ left: `${percentToNextLevel}%`}} >{currentExperience}xp</span>
            </div>
            <span>{experrienceToNextLevel} xp</span>
        </header>
    );
} 