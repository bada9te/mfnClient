import { useSelector } from "react-redux";
import RightBarUsersItem from "../common/right-bar-users-item/right-bar-users-item";

const EnumRightbarUsers = props => {
    const usersData = useSelector(state => state.rightBarUsersContainer.usersData);
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                usersData.map((item, key) => {
                    return (
                        <div key={key}>
                            <RightBarUsersItem
                                id={item._id}
                                avatar={`${locations?.images}/${item.avatar}`}
                                background={`${locations?.images}/${item.background}`}
                                nickname={item.nick}
                                description={item.description}
                            />
                        </div>
                    );
                })
            }
        </>
    );
}

export default EnumRightbarUsers;