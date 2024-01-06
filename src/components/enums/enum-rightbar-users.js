import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";
import RightBarUsersItem from "../common/right-bar-users-item/right-bar-users-item";

const EnumRightbarUsers = props => {
    const { users } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                users.map((item, key) => {
                    return (
                        <RightBarUsersItem
                            key={key}
                            id={item._id}
                            avatar={`${locations?.images}/${item.avatar}`}
                            nickname={item.nick}
                            description={item.description}
                        />
                    );
                })
            }
        </>
    );
}

export default EnumRightbarUsers;