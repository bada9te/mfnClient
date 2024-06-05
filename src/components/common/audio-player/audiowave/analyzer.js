const audioAnalyzer = (audioElemRef, analyzerData, setAnalyzerData) => {
    // create audio ctx
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // analyzer with buffer size of 2048
    const analyzer = analyzerData?.analyzer || audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let source = null;
    if (!analyzerData) {
        source = audioCtx.createMediaElementSource(audioElemRef.current);
        source.connect(analyzer);
        source.connect(audioCtx.destination);
        source.opened = () => {
            source.disconnect();
        };
    } else {
        source = analyzerData.source;
    }

    // set the analyzerData state with the analyzer, bufferLength, and dataArray
    setAnalyzerData({analyzer, bufferLength, dataArray, source});
}

export default audioAnalyzer;
