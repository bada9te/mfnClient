import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import animateBars from "./animateBars";

// Component to render the waveform
const WaveForm = ({ analyzerData, waveContainerRef }) => {
    const theme = useSelector(state => state.base.theme);

    // Ref for the canvas element
    const canvasRef = useRef(null);
    const { dataArray, analyzer, bufferLength } = analyzerData;
  
    // Function to draw the waveform
    const draw = (dataArray, analyzer, bufferLength, userTheme) => {
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
            animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength, userTheme);
        };
    
        animate();
    };
  
    // Effect to draw the waveform on mount and update
    useEffect(() => {
      draw(dataArray, analyzer, bufferLength, theme);
    }, [dataArray, analyzer, bufferLength, theme]);
  
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