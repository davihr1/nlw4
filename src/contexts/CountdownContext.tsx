import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {

            minutes: number,
            seconds: number,
            hasFinished: boolean,
            isactive: boolean,
            startCountdown: () => void,
            resetCountdown: () => void,

}

interface CountdowProviderProps {
    children: ReactNode; 
}

let caountdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider ( {children}: CountdowProviderProps) {
    
    const { startNewChallange } = useContext(ChallengesContext);
    console.log(startNewChallange)
        const [time, setTime] = useState( 25 * 60);
        const [isactive , setisActive] = useState(false);
        const [hasFinished, sethasFinished] = useState(false);
    
        const minutes = Math.floor(time / 60);
    
        const seconds = time % 60;



        
    function startCountdown() {
        setisActive(true);
        document.querySelector("body").style.background = '';
        document.getElementById("challengesBoxContainer").style.backgroundColor= ''
        document.querySelector("body").style.color = '';
        document.getElementById("challengesBoxContainer").style.color = ''
    }

    function resetCountdown() {
        clearTimeout(caountdownTimeout)
        setisActive(false);
        setTime(0.1 * 60);
        sethasFinished(false);
        // edit colors

        document.querySelector("body").style.background = 'var(--red)'
        document.querySelector("body").style.color = 'var(--white)'
        document.getElementById("challengesBoxContainer").style.backgroundColor= 'transparent'
        document.getElementById("challengesBoxContainer").style.color = 'white'
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


        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isactive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    );
}