import CategoryCard from "../common/catgeory-card/category-card";

export default function EnumCategories(props: {
    categories: { title: string; color: string; color2: string; }[];
    handleClick: (categoryName: string) => void;
}) {
    const { categories, handleClick } = props;

    return (
        <>
            {
                categories.map((item, i) => {
                    return (
                        <CategoryCard
                            key={i}
                            title={item.title}
                            color={item.color}
                            color2={item.color2}
                            handleClick={() => handleClick(item.title)}
                        />
                    );
                })
            }
        </>
    );
}