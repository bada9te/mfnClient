import { useReactiveVar } from "@apollo/client/index.js";
import { baseState } from "../baseReactive";
import RightBarUsersItem from "../common/right-bar-users-item/right-bar-users-item";
import { UsersByNicknameQuery } from "utils/graphql-requests/generated/schema";

export default function EnumRightbarUsers(props: {
    users: UsersByNicknameQuery["usersByNickname"]
}) {
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
