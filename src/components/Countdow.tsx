import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css"

    let caountdownTimeout: NodeJS.Timeout;


export default function Countdown() {
    const { startNewChallange } = useContext(ChallengesContext);
console.log(startNewChallange)
    const [time, setTime] = useState( 0.1 * 60);
    const [isactive , setisActive] = useState(false);
    const [hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    const [minuteLaft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLaft, secondsRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown() {
        clearTimeout(caountdownTimeout)
        setisActive(false);
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isactive && time > 0) {
            caountdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isactive && time === 0) {
            sethasFinished(true);
            setisActive(false);
            startNewChallange();
        }
    }, [isactive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLaft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondsLaft}</span>
                <span>{secondsRight}</span>
            </div>
        </div>
;
        { hasFinished ? (
                <button disabled
                className={`${styles.countdowButton}`}>
                  Ciclo encerrado...       
                </button>
        ) : (
            <>
               { isactive ? (
                    <button type="button" className={`${styles.countdowButton} ${styles.countdowButtonActive}`}
                    onClick={resetCountdown}>
            
                         Abandonar Ciclo
            
                    </button>
        ) : (
            <button type="button" className={styles.countdowButton}
            onClick={startCountdown}>
    
                Iniciar Ciclo
    
            </button>
        ) }
            </>
        )}
        </div>
    );
}