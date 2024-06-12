import { Stack } from "@mui/material";
import EnumCategories from "@/components/enums/enum-categories";
import { genres } from "@/config";
import {categoriesContainerState} from "@/components/containers/categories-container/reactive.ts";
import {useNavigate} from "react-router-dom";

export default function CategoriesLeftbarConatiner() {
    const navigate = useNavigate();

    const handleCategoryOpen = (category: string) => {
        categoriesContainerState({...categoriesContainerState, selectedCategory: category, openedTab: 1});
        navigate("/app/categories");
    }

    return (
        <Stack spacing={2} sx={{
            p: 2,
            width: '100%',
        }}>
            <EnumCategories categories={genres} handleClick={handleCategoryOpen}/>
        </Stack>
    );
}