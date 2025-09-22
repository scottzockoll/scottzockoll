import Image from "next/image";
import styles from "./page.module.css";
import TimeAwareGoofe from "./components/TimeAwareGoofe";
import TimeAwareWindow from "./components/TimeAwareWindow";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.scene}>
        <TimeAwareWindow width={675} height={844} className={styles.window} showRain={false} />
        <TimeAwareGoofe width={1200} height={900} className={styles.goofe} animate animationSpeed={6} forceSleepy={false} />
      </div>
    </div>
  );
}
