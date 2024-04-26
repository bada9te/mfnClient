// This function takes in the audio data, analyzes it, and generates a waveform
// that is visualized on a canvas element.
function animateBars(analyser, canvas, canvasCtx, dataArray, bufferLength, theme) {
    // Analyze the audio data using the Web Audio API's `getByteFrequencyData` method.
    analyser.getByteFrequencyData(dataArray);
  
    // Set the canvas fill style to black.
    canvasCtx.fillStyle = '#000';
  
    // Calculate the height of the canvas.
    const HEIGHT = canvas.height;
  
    // Calculate the width of each bar in the waveform based on the canvas width and the buffer length.
    var barWidth = Math.ceil(canvas.width / bufferLength) * 4;
  
    // Initialize variables for the bar height and x-position.
    let barHeight;
    let x = 0;
  
    // Loop through each element in the `dataArray`.
    for (var i = 0; i < bufferLength; i++) {
      // Calculate the height of the current bar based on the audio data and the canvas height.
      barHeight = (dataArray[i] / 255) * HEIGHT / 1.35;
  
      canvasCtx.fillStyle = '#80ED99';
  
      // Draw the bar on the canvas at the current x-position and with the calculated height and width.
      canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
  
      // Update the x-position for the next bar.
      x += barWidth + 1;
    }
  }

export default animateBars;