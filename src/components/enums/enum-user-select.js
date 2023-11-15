import { useSelector } from "react-redux";
import UserSelectItem from "../common/user-select-item/user-select-item";

const EnumUserSelect = props => {
    const { userSelectionHandler, users } = props;
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                users.map((item, key) => {
                    return (
                        <UserSelectItem 
                            key={key}
                            id={item._id} 
                            avatar={item?.avatar ? `${locations?.images}/${item.avatar}` : "NULL"} 
                            nickname={item.nick} 
                            description={item.description}
                            userSelectionHandler={userSelectionHandler}
                        />
                    );
                })
            }
        </>
    );
}

export default EnumUserSelect;