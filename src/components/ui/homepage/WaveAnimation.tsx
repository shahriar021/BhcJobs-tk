import React from 'react'
import { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const WaveAnimation = () => {
  const { width } = useWindowDimensions();
  const [phase, setPhase] = useState(0);
  const frameRef = useRef<any>(null);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = ((timestamp - start) % 4000) / 4000; 
      setPhase(progress);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const offset = Math.sin(phase * Math.PI * 2) * 25;

  const w = width;
  const wavePath = `M0,${30 + offset} C${w * 0.33},${30 - offset} ${w * 0.66},${30 + offset} ${w},${30 - offset} L${w},80 L0,80 Z`;

  return (
    <View style={{ height: 80, marginTop: 10 }}>
      <Svg width={w} height={80} viewBox={`0 0 ${w} 80`}>
        <Path fill="#f6f7f9" d={wavePath} />
      </Svg>
    </View>
  );
};

export default WaveAnimation