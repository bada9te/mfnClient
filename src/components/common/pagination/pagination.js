import { Pagination, Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "./paginationSlice";


const PaginationTree = props => {
    const dispatch = useDispatch();
    const activePage = useSelector(state => state?.pagination?.activePage);
    const maxPage = useSelector(state => state?.pagination?.maxPage);
    const handlePageChange = (e, pageNumber) => {
        dispatch(setActivePage(pageNumber))
    }

    useEffect(() => {
        console.log(maxPage)
    }, [maxPage])
 
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={maxPage} page={activePage} onChange={handlePageChange} color="primary"/>
            </Box>
        </>
    );
}

export default PaginationTree;
