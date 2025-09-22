"use client";

import styles from "./Rain.module.css";

interface RainProps {
  isActive?: boolean;
}

export default function Rain({ isActive = false }: RainProps) {
  if (!isActive) return null;

  return (
    <div className={styles.rainContainer}>
      <div className={styles.rainOverlay}>
        <svg width="100%" height="100%" viewBox="-10.838 6.4058 336.636 385.438" preserveAspectRatio="none" className={styles.rainSvg}>
          <defs>
            <style>{`
              .raindrop {
                stroke: #B0B0B0;
                stroke-width: 1;
                stroke-linecap: round;
                stroke-linejoin: round;
                opacity: 0.8;
                fill: none;
              }
            `}</style>
          </defs>

          <path className={`raindrop ${styles.drop1}`} d="M42.9222 204.896C44.6213 210.084 59.8283 229.784 64.2215 228.71" />
          <path className={`raindrop ${styles.drop2}`} d="M65.0633 183.791C70.8959 191.549 76.3774 200.018 82.6663 207.433" />
          <path className={`raindrop ${styles.drop3}`} d="M81.8717 155.82C86.5337 161.317 91.039 167.472 96.9322 171.701" />
          <path className={`raindrop ${styles.drop4}`} d="M113.771 118.356C115.707 122.032 132.672 140.091 136.04 140.858" />
          <path className={`raindrop ${styles.drop5}`} d="M124.607 89.6964C123.954 92.5647 133.976 100.394 136.395 101.862" />
          <path className={`raindrop ${styles.drop6}`} d="M135.701 118.369C141.57 126.585 148.627 137.272 157.303 142.539" />
          <path className={`raindrop ${styles.drop7}`} d="M154.975 93.4506C156.161 98.2993 162.96 104.308 166.344 108.299" />
          <path className={`raindrop ${styles.drop8}`} d="M155.412 58.3043C154.2 56.8749 157.046 61.6956 158.121 63.2311C159.224 64.807 162.048 70.4465 164.31 70.9616" />
          <path className={`raindrop ${styles.drop9}`} d="M132.531 75.5061C135.486 78.3389 138.294 81.2901 140.943 84.413" />
          <path className={`raindrop ${styles.drop10}`} d="M175.562 79.1743C174.834 79.3522 177.88 82.3617 182.454 88.0226C187.14 93.8225 191.196 99.805 195.428 105.918C196.987 108.17 201.465 114.786 200.814 112.125" />
          <path className={`raindrop ${styles.drop11}`} d="M164.059 128.849C165.963 136.638 177.206 140.418 179.201 148.579" />
          <path className={`raindrop ${styles.drop12}`} d="M89.7833 182.907C90.9531 184.766 100.788 199.779 101.598 199.58" />
          <path className={`raindrop ${styles.drop13}`} d="M85.1734 241.43C87.6482 245.642 91.2323 254.263 95.6271 256.932" />
          <path className={`raindrop ${styles.drop14}`} d="M49.3239 239.876C52.0856 244.926 55.7198 252.436 60.0255 256.392" />
          <path className={`raindrop ${styles.drop15}`} d="M71.2821 292.764C74.8942 298.506 82.3798 309.52 88.0421 312.958" />
          <path className={`raindrop ${styles.drop16}`} d="M90.1194 283.644C90.3719 284.677 107.73 302.915 109.616 303.599" />
          <path className={`raindrop ${styles.drop17}`} d="M100.918 223.178C101.854 227.004 110.169 232.064 112.909 235.294" />
          <path className={`raindrop ${styles.drop18}`} d="M126.188 213.991C127.468 219.227 135.313 224.356 138.521 228.388C141.669 232.343 143.554 237.353 146.811 241.194" />
          <path className={`raindrop ${styles.drop19}`} d="M134.161 161.309C139.502 168.304 144.584 175.501 149.699 182.662" />
          <path className={`raindrop ${styles.drop20}`} d="M174.473 181.12C173.956 183.392 181.146 188.687 182.885 190.027" />
          <path className={`raindrop ${styles.drop21}`} d="M192.823 129.556C195.947 134.789 203.191 144.315 208.379 147.465" />
          <path className={`raindrop ${styles.drop22}`} d="M150.227 198.011C154.565 203.125 159.357 208.051 163.976 212.922" />
          <path className={`raindrop ${styles.drop23}`} d="M114.145 260.573C118.591 265.376 122.582 270.762 127.389 275.178" />
        </svg>
      </div>
    </div>
  );
}