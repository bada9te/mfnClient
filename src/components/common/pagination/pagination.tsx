import { Pagination, Box } from "@mui/material";


export default function PaginationTree(props: {
    maxPage?: number;
    activePage?: number;
    handlePageChange: (page: number) => void;
}) {
    const { maxPage, activePage, handlePageChange } = props;

    const handleChangePageEvent = (event: React.ChangeEvent<unknown>, newPage: number) => {
        handlePageChange(newPage);
    };
 
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Pagination count={maxPage} page={activePage} onChange={handleChangePageEvent} color="primary"/>
        </Box>
    );
}
