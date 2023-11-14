import { Pagination, Box } from "@mui/material";


const PaginationTree = props => {
    const { maxPage, activePage, handlePageChange } = props;

    const handleChangePageEvent = (event, newPage) => {
        handlePageChange(newPage);
    };
 
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Pagination count={maxPage} page={activePage} onChange={handleChangePageEvent} color="primary"/>
        </Box>
    );
}

export default PaginationTree;
