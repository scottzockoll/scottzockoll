import Image from "next/image";
import styles from "./page.module.css";
import TimeAwareGoofe from "./components/TimeAwareGoofe";
import TimeAwareWindow from "./components/TimeAwareWindow";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.scene}>
        <TimeAwareWindow width={475} height={544} className={styles.window} showRain={true} />
        <TimeAwareGoofe width={1200} height={900} className={styles.goofe} animate animationSpeed={6} forceSleepy={false} />
      </div>
    </div>
  );
}
