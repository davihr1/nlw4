import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export default function Profile() {

    const { level } = useContext(ChallengesContext)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/davifa1.png" alt="Davi Henrique"/>
            <div>
                <strong>
                    Davi Henrique
                </strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level: {level}
                    </p>
            </div>
        </div>
    );
}