import Image from "next/image";
import styles from "./page.module.css";
import TimeAwareGoofe from "./components/TimeAwareGoofe";
import Window from "./components/Window";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.scene}>
        <Window width={675} height={844} className={styles.window} animate animationSpeed={10} />
        <TimeAwareGoofe width={1200} height={900} className={styles.goofe} animate animationSpeed={6} />
      </div>
    </div>
  );
}
