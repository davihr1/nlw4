import { createContext, ReactNode, useEffect, useState } from "react";
import chanlleges from "../../challenges.json";

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challangesCompleted: number;
    experrienceToNextLevel: number;
    startNewChallange: () => void;
    resetChallenges: () => void; 
    CompletChallenge: () => void;
    levelUp: () => void;
    activeChallenges: Challenge;
}

interface ChallengesProviderProps {
    children: ReactNode; 
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {

    const [level, setlevel] = useState(1);
    const [currentExperience, setcurretExperience] = useState(0);
    const [challangesCompleted, setchallangesCompleted] = useState(0);
    const [activeChallenges, setactiveChalleges] = useState(null);

    const experrienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setlevel(level + 1);
    }

    function startNewChallange() {

          const randomChallengeIndex = Math.floor(Math.random() * chanlleges.length);
          const challenge = chanlleges[randomChallengeIndex];

          setactiveChalleges(challenge);

          new Audio('/notification.mp3').play()
          if( Notification.permission === 'granted') {
              new Notification('Novo Desafio', {
                  body: `Valendo ${challenge.amount}xp`
              })
          }

    }

    function resetChallenges() {
        setactiveChalleges(null)
    }

    function CompletChallenge() {
        if(!activeChallenges) {
            return ;
        }

        const {amount} = activeChallenges;

        let finalExperience = currentExperience  + amount;

        if (finalExperience >= experrienceToNextLevel) {
            finalExperience  = finalExperience - experrienceToNextLevel; 
            levelUp();
        }

        setcurretExperience(finalExperience);
        setactiveChalleges(null)
        setchallangesCompleted(challangesCompleted + 1); 
    }


    return (
    <ChallengesContext.Provider value={{ 
        level,
         currentExperience,
          challangesCompleted ,
      startNewChallange,
      resetChallenges,
      levelUp,
      experrienceToNextLevel,
      CompletChallenge,
       activeChallenges,}}>
        {children}
    </ChallengesContext.Provider>
    )
};