// get parsed date
const getParsedDate = (date) => {
    const dateCreated = new Date(date);
    let year, month, day;
    year = dateCreated.getFullYear();
    month = dateCreated.getMonth()+1 >= 10 ? dateCreated.getMonth()+1 : `0${dateCreated.getMonth()+1}`;
    day = dateCreated.getDay() >= 10 ? dateCreated.getDay() : `0${dateCreated.getDay()}`;
    return `${day}.${month}.${year}`;
}

export default getParsedDate;