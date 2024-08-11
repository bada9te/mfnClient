const getTimeLeft = (timeleft: number) => {
    //let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return {h: 0, m: 0, s: 0};
    }
    
    return {h: hours, m: minutes, s: seconds}
}

export default getTimeLeft;