"use client"
import CategoryLeftBar from "@/components/bars/category-leftbar/category-leftbar";
import {genres} from "@/config/categories";
import { usePostsByCategoryCountQuery } from "@/utils/graphql-requests/generated/schema";

export default function CategoriesContainerLeftbar() {
    const { data: postsCountByCategory, loading } = usePostsByCategoryCountQuery();

    return (
        <>
            {
                genres.map((gen, i) => {
                    return (
                        <CategoryLeftBar
                            key={i}
                            title={gen.title}
                            bgImage={gen.bg}
                            iconImage={gen.icon}
                            description={gen.description}
                            // @ts-ignore
                            count={Number(postsCountByCategory?.postsByCategoryCount[gen.title.toLocaleLowerCase()]) || 0}
                        />
                    );
                })
            }
        </>
    );
};