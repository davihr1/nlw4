import styles from "../styles/components/ExperienceBar.module.css";


export function ExperienceBar() {
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: '58%'}} />

                <span className={styles.currenceExperience} style={{ left: '58%'}} >300px</span>
            </div>
            <span>600 xp</span>
        </header>
    );
} 