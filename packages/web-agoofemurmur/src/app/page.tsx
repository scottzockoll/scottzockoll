import Image from "next/image";
import styles from "./page.module.css";
import GoofeInBed from "./components/GoofeInBed";

export default function Home() {
  return (
    <div className={styles.page}>
      <GoofeInBed width={800} height={600} className={styles.svg} animate />
    </div>
  );
}
