import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from  '../styles/components/ChallengesBox.module.css';

export default function ChallengesBox() {
    const { activeChallenges, resetChallenges, CompletChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded () {
        CompletChallenge();
        resetCountdown();

    }
    function handleChallengeFailed () {
        resetChallenges();
        resetCountdown();
    }

    return (
        <div className={styles.challengesBoxContainer}>
            {
                activeChallenges ? (
                    <div className={styles.ChallendeActive}>
                        <header>Ganhe {activeChallenges.amount}xp </header>

                        <main>
                            <img src={(`icons/${activeChallenges.type}.svg`)} alt="icon"/>
                            <strong>Novo desafio</strong>
                            <p> {activeChallenges.description} </p>
                        </main>

                        <footer>
                           <button type="button"
                           onClick={handleChallengeFailed}
                           className={styles.challengeFailedButton}>Falhei</button>

                           <button type="button"
                           onClick={handleChallengeSucceeded}
                           className={styles.challengeSuccededButton}>Completei</button>
                        </footer>
 
                    </div>
                ) : (
                    
                    <div className={styles.challengeNotActive}>
                    <strong>
                        Finalize um ciclo para receber um desafio 
                    </strong>
    
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
                )
            }
        </div>
    );
}