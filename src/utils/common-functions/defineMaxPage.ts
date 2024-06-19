const defineMaxPage = (count: number, maxCountPerPage: number) => {
    return Math.ceil(count / maxCountPerPage);
};

export default defineMaxPage;

