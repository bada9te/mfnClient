import { useReactiveVar } from "@apollo/client";
import { useRef, useEffect, useCallback } from "react";
import { baseState } from "../../../baseReactive";
import animateBars from "./animateBars";

// Component to render the waveform
const WaveForm = ({ analyzerData }) => {
    const { theme } = useReactiveVar(baseState);

    // Ref for the canvas element
    const canvasRef = useRef(null);
    
    // Function to draw the waveform
    const draw = useCallback(() => {
        const { dataArray, analyzer, bufferLength } = analyzerData;
        const canvas = canvasRef.current;

        // Make it visually fill the positioned parent
        canvas.style.width ='100%';
        canvas.style.height='100%';
        // ...then set the internal size to match
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        if (!canvas || !analyzer) return;
        const canvasCtx = canvas.getContext("2d");
    
        const animate = () => {
            requestAnimationFrame(animate);
            canvas.width = canvas.width;
            animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength, theme);
        };
    
        animate();
    }, [analyzerData, theme]);
  
    // Effect to draw the waveform on mount and update
    useEffect(() => {
      draw();
    }, [draw]);
  
    // Return the canvas element
    return (
      <canvas
        style={{
          
        }}
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
};
  
export default WaveForm;