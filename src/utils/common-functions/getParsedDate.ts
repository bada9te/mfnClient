// get parsed date
const getParsedDate = (date: Date) => {
    const dateCreated = new Date(date);
    let year, month, day, hours, mins;
    year = dateCreated.getFullYear();
    month = dateCreated.getMonth()+1 >= 10 ? dateCreated.getMonth()+1 : `0${dateCreated.getMonth()+1}`;
    day = dateCreated.getDay() >= 10 ? dateCreated.getDay() : `0${dateCreated.getDay()}`;
    hours = dateCreated.getHours() >= 10 ? dateCreated.getHours() : `0${dateCreated.getHours()}`;
    mins = dateCreated.getMinutes() >= 10 ? dateCreated.getMinutes() : `0${dateCreated.getMinutes()}`;
    return `${day}.${month}.${year} ${hours}:${mins}`;
}

export default getParsedDate;