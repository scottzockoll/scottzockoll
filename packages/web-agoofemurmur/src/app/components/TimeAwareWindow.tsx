"use client";

import { useState, useEffect } from "react";
import styles from "./TimeAwareWindow.module.css";

interface TimeAwareWindowProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  showRain?: boolean;
}

export default function TimeAwareWindow({
  width = 200,
  height = 200,
  alt = "Window",
  className,
  showRain = false
}: TimeAwareWindowProps) {
  const [windowType, setWindowType] = useState("morning");
  const [mounted, setMounted] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    setWindowType("morning");

    // Fetch the SVG content
    fetch("/morning-window.svg")
      .then(response => response.text())
      .then(svgText => {
        console.log("SVG loaded, length:", svgText.length);
        console.log("Rain group found:", svgText.includes('class="rain"'));

        // Add individual SVG animateTransform elements to each path
        let styledSvg = svgText;

        // Generate random timing sequences for each raindrop
        const generateRandomTimings = (count) => {
          const timings = [];

          for (let i = 0; i < count; i++) {
            const duration = 0.5 + Math.random() * 1; // Animation duration: 0.5-1.5 seconds

            // Generate many random begin times over a long period
            const beginTimes = [];
            let currentTime = Math.random() * 5; // Initial random delay 0-5s

            // Generate 50 random intervals to cover a long time period
            for (let j = 0; j < 50; j++) {
              beginTimes.push(currentTime);
              currentTime += duration + 1 + Math.random() * 4; // 1-5s between animations
            }

            timings.push({
              duration,
              beginTimes: beginTimes.map(t => `${t.toFixed(2)}s`).join('; ')
            });
          }

          return timings;
        };

        const timings = generateRandomTimings(23);

        // Find all path elements in the rain group and add individual animations
        const rainGroupMatch = styledSvg.match(/<g class="rain"[^>]*>(.*?)<\/g>/s);
        if (rainGroupMatch) {
          let rainContent = rainGroupMatch[1];
          const pathMatches = Array.from(rainContent.matchAll(/<path[^>]*\/>/g));

          pathMatches.forEach((pathMatch, index) => {
            const timing = timings[index] || { duration: 0.8, beginTimes: '0s' };
            const originalPath = pathMatch[0];
            const animatedPath = originalPath.replace('/>',
              `>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 8,15"
                  dur="${timing.duration}s"
                  begin="${timing.beginTimes}"
                  fill="freeze"/>
                <animate
                  attributeName="opacity"
                  values="0; 0.8; 0.8; 0"
                  keyTimes="0; 0.2; 0.6; 1"
                  dur="${timing.duration}s"
                  begin="${timing.beginTimes}"
                  fill="freeze"/>
              </path>`
            );
            rainContent = rainContent.replace(originalPath, animatedPath);
          });

          styledSvg = styledSvg.replace(rainGroupMatch[0], `<g class="rain">${rainContent}</g>`);
        }

        // Add CSS to make rain invisible by default
        const initialStyles = `
          <style>
            .rain path {
              opacity: 0;
            }
          </style>
        `;
        styledSvg = styledSvg.replace('<svg', initialStyles + '<svg');

        setSvgContent(styledSvg);
      })
      .catch(error => {
        console.error("Failed to load SVG:", error);
      });
  }, []);

  useEffect(() => {
    if (svgContent) {
      // Check DOM structure after SVG is rendered
      setTimeout(() => {
        const rainElements = document.querySelectorAll('.rain');
        const rainPaths = document.querySelectorAll('.rain path');
        console.log("Rain elements found in DOM:", rainElements.length);
        console.log("Rain path elements found in DOM:", rainPaths.length);

        if (rainElements.length > 0) {
          console.log("First rain element:", rainElements[0]);
          console.log("First rain element classes:", rainElements[0].className);
        }
      }, 100);
    }
  }, [svgContent]);

  // Show loading during SSR and while fetching SVG
  if (!mounted || !svgContent) {
    return (
      <div
        style={{
          width: width,
          height: height,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={className}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      className={`${showRain ? styles.showRain : ""} ${className || ""}`}
    >
      <div
        style={{ width: width, height: height }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}