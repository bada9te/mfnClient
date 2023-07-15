import { useSelector } from "react-redux";
import UserSelectItem from "../common/user-select-item/user-select-item";

const EnumUserSelect = props => {
    const { userSelectionHandler } = props;
    const locations = useSelector(state => state.base.locations);
    const users = useSelector(state => state.userSelectContainer.users);

    return (
        <>
            {
                users.map((item, key) => {
                    return (
                        <UserSelectItem 
                            key={key}
                            id={item._id} 
                            avatar={`${locations?.images}/${item.avatar}`} 
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