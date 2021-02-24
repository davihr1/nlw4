import { createContext, ReactNode, useState } from "react";
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
    startNewChallange: () => void;
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



    function levelUp() {
        setlevel(level + 1);
    }

    function startNewChallange() {
          const randomChallengeIndex = Math.floor(Math.random() * chanlleges.length);
          const challenge = chanlleges[randomChallengeIndex];

          setactiveChalleges(challenge);
          console.log(randomChallengeIndex)
    }


    return (
    <ChallengesContext.Provider value={{ 
        level,
         currentExperience,
          challangesCompleted ,
      startNewChallange,
      levelUp,
       activeChallenges,}}>
        {children}
    </ChallengesContext.Provider>
    )
};