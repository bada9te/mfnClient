const defineMaxPage = (count, maxCountPerPage) => {
    return Math.ceil(count / maxCountPerPage);
};

export default defineMaxPage;

