import { Stack } from "@mui/material";
import EnumCategories from "@/components/enums/enum-categories";
import { genres } from "@/config";

export default function CategoriesLeftbarConatiner() {
    return (
        <Stack spacing={2} sx={{
            p: 2,
            width: '100%',
        }}>
            <EnumCategories categories={genres} handleClick={() => {}}/>
        </Stack>
    );
}