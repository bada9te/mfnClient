import CategoryCard from "../common/catgeory-card/category-card";

export default function EnumCategories(props: {
    categories: any[];
    handleClick: (categoryName: string) => void;
}) {
    const { categories, handleClick } = props;

    return (
        <>
            {
                categories.map((item, i) => {
                    return (
                        <CategoryCard key={i} title={item.title} color={item.color} handleClick={() => handleClick(item.title)}/>
                    );
                })
            }
        </>
    );
}