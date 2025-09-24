"use client";

import { useState, useEffect, memo } from "react";
import styles from "./TimeAwareWindow.module.css";

interface TimeAwareWindowProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  showRain?: boolean;
  timeOverride?: 'day' | 'night';
}

function TimeAwareWindow({
  width = 200,
  height = 200,
  alt = "Window",
  className,
  showRain = false,
  timeOverride
}: TimeAwareWindowProps) {
  const [windowType, setWindowType] = useState("morning");
  const [mounted, setMounted] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    // Determine time of day
    let isNight: boolean;
    if (timeOverride) {
      isNight = timeOverride === 'night';
    } else {
      const currentHour = new Date().getHours();
      isNight = currentHour >= 20 || currentHour < 4; // 8pm to 4am
    }
    const timeOfDay = isNight ? "night" : "morning";
    setWindowType(timeOfDay);

    // Fetch the appropriate SVG content
    const svgFile = isNight ? "/window-night.svg" : "/morning-window.svg";
    fetch(svgFile)
      .then(response => response.text())
      .then(svgText => {
        console.log("SVG loaded, length:", svgText.length);
        console.log("Rain group found:", svgText.includes('class="rain"'));

        // Add individual SVG animateTransform elements to each path
        let styledSvg = svgText;

        // Generate CSS animations for infinite rain
        const generateRainAnimations = (count: number) => {
          let cssAnimations = '';

          for (let i = 0; i < count; i++) {
            const duration = (3 + Math.random() * 7).toFixed(2); // 3-10s total cycle
            const delay = (Math.random() * 10).toFixed(2); // 0-10s initial delay
            const animationDuration = (0.5 + Math.random() * 1).toFixed(2); // 0.5-1.5s drop duration

            cssAnimations += `
              .rain path:nth-child(${i + 1}) {
                animation:
                  raindrop-${i} ${duration}s infinite,
                  rainopacity-${i} ${duration}s infinite;
                animation-delay: ${delay}s;
              }

              @keyframes raindrop-${i} {
                0%, ${(parseFloat(animationDuration) / parseFloat(duration) * 100).toFixed(1)}% {
                  transform: translate(0, 0);
                }
                ${(parseFloat(animationDuration) / parseFloat(duration) * 100).toFixed(1)}% {
                  transform: translate(8px, 15px);
                }
                100% {
                  transform: translate(0, 0);
                }
              }

              @keyframes rainopacity-${i} {
                0% { opacity: 0; }
                ${(0.2 * parseFloat(animationDuration) / parseFloat(duration) * 100).toFixed(1)}% { opacity: 0.8; }
                ${(0.6 * parseFloat(animationDuration) / parseFloat(duration) * 100).toFixed(1)}% { opacity: 0.8; }
                ${(parseFloat(animationDuration) / parseFloat(duration) * 100).toFixed(1)}% { opacity: 0; }
                100% { opacity: 0; }
              }
            `;
          }

          return cssAnimations;
        };


        // Find rain group and add CSS animations
        // @ts-expect-error this is fine
        const rainGroupMatch = styledSvg.match(/<g class="rain"[^>]*>(.*?)<\/g>/s);
        if (rainGroupMatch) {
          const rainContent = rainGroupMatch[1];
          const pathMatches = Array.from(rainContent.matchAll(/<path[^>]*\/>/g));
          const rainAnimations = generateRainAnimations(pathMatches.length);

          // Add the CSS animations to the style block
          const existingStyleMatch = styledSvg.match(/<style>(.*?)<\/style>/s);
          if (existingStyleMatch) {
            const newStyles = existingStyleMatch[1] + rainAnimations;
            styledSvg = styledSvg.replace(existingStyleMatch[0], `<style>${newStyles}</style>`);
          } else {
            styledSvg = styledSvg.replace('<svg', `<style>${rainAnimations}</style><svg`);
          }
        }

        // Add CSS to control rain visibility - hide rain group by default
        const rainStyles = `
          <style>
            .rain {
              display: none;
            }
            .rain.active {
              display: block;
            }
            .rain path {
              opacity: 0;
            }
          </style>
        `;
        styledSvg = styledSvg.replace('<svg', rainStyles + '<svg');

        setSvgContent(styledSvg);
      })
      .catch(error => {
        console.error("Failed to load SVG:", error);
      });
  }, [timeOverride]);

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

  // Control rain animation based on showRain prop
  useEffect(() => {
    if (svgContent) {
      const rainElements = document.querySelectorAll('.rain');
      rainElements.forEach(element => {
        const isCurrentlyActive = element.classList.contains('active');

        if (showRain && !isCurrentlyActive) {
          element.classList.add('active');
          console.log("Rain animation started");
        } else if (!showRain && isCurrentlyActive) {
          element.classList.remove('active');
          console.log("Rain animation stopped");
        }
      });
    }
  }, [showRain, svgContent]);

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

export default memo(TimeAwareWindow);