import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css"

export default function Countdown() {
 
    const { minutes, seconds, hasFinished,
         isactive, startCountdown, resetCountdown } = useContext(CountdownContext)

    const [minuteLaft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLaft, secondsRight] = String(seconds).padStart(2, '0').split('');

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