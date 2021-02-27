import React, { createContext, ReactNode, useEffect, useState } from "react";
import chanlleges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelupModal";

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
    closeLevelUpModal: () => void;
    activeChallenges: Challenge;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challangesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {

    const [level, setlevel] = useState(rest.level ?? 1);
    const [currentExperience, setcurretExperience] = useState(rest.currentExperience ?? 0);
    const [challangesCompleted, setchallangesCompleted] = useState(rest.challangesCompleted ?? 0);
    const [activeChallenges, setactiveChalleges] = useState(null);

    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const experrienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challangesCompleted', String(challangesCompleted))
    }, [level, currentExperience, challangesCompleted])

    function levelUp() {
        setlevel(level + 1);
        setLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setLevelUpModalOpen(false)
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
      activeChallenges,
      closeLevelUpModal,}}>
        {children}

        { isLevelUpModalOpen && <LevelUpModal />
            
        }
    </ChallengesContext.Provider>
    )
};