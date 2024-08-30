"use client"
import CategoryLeftBar from "@/components/bars/category-leftbar/category-leftbar";
import {genres} from "@/config/categories";
import { getDictionary } from "@/dictionaries/dictionaries";
import formatNumber from "@/utils/common-functions/formatNumber";
import { usePostsByCategoryCountQuery } from "@/utils/graphql-requests/generated/schema";

export default function CategoriesContainerLeftbar({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { data: postsCountByCategory } = usePostsByCategoryCountQuery();

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
                            count={formatNumber((() => {
                                if (gen.title === "Hip-hop") {
                                    // @ts-ignore
                                    return Number(postsCountByCategory?.postsByCategoryCount["hipHop"]) || 0
                                }
                                // @ts-ignore
                                return Number(postsCountByCategory?.postsByCategoryCount[gen.title.toLocaleLowerCase()]) || 0
                            })())}
                        />
                    );
                })
            }
        </>
    );
};