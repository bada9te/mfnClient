import { useSelector } from "react-redux";
import RightBarUsersItem from "../common/right-bar-users-item/right-bar-users-item";

const EnumRightbarUsers = props => {
    const { users } = props;
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                users.map((item, key) => {
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