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
  
      // Generate random RGB values for each bar.
      const maximum = 10;
      const minimum = -10;

      let rgb = theme === 'dark' ? [144, 202, 249] : [25, 118, 210];

      var r = rgb[0] + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var g = rgb[1] + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var b = rgb[2] + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  
      // Set the canvas fill style to the random RGB values.
      canvasCtx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
  
      // Draw the bar on the canvas at the current x-position and with the calculated height and width.
      canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
  
      // Update the x-position for the next bar.
      x += barWidth + 1;
    }
  }

export default animateBars;