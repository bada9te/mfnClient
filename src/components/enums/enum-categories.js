import CategoryCard from "../common/catgeory-card/category-card";

const EnumCategories = props => {
    const { categories } = props;

    return (
        <>
            {
                categories.map((item, i) => {
                    return (
                        <CategoryCard key={i} title={item.title} color={item.color}/>
                    );
                })
            }
        </>
    );
}

export default EnumCategories;