import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { httpGetUserById, httpSwitchSubscriptionOnUser } from "../../../../requests/users";

const initialState = {
    isLoading: true,
    profileOwner: null,
}

export const fetchUserById = createAsyncThunk(
    'profile-card/fetchUser',
    async(id) => {
        return await httpGetUserById(id);
    }
);

export const handleSubscribtion = createAsyncThunk(
    'profile-card/switchSubiptionOnUser',
    async({subscriberId, profileOwnerId}) => {
        return await httpSwitchSubscriptionOnUser(subscriberId, profileOwnerId);
    }
);


const profileCardSlice = createSlice({
    name: 'profile-card',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setProfileOwner: (state, action) => {
            const user = action.payload;
            state.profileOwner = {
                id: user?._id,
                background: user?.background,
                avatar: user?.avatar,
                nick: user?.nick,
                description: user?.description,
                subscribers: user?.subscribers,
                subscribedOn: user?.subscribedOn
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch user
            .addCase(fetchUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserById.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                const fetchedUser = action.payload.data.user;
                state.profileOwner = {
                    id: fetchedUser._id,
                    background: fetchedUser.background,
                    avatar: fetchedUser.avatar,
                    nick: fetchedUser.nick,
                    description: fetchedUser.description,
                    subscribers: fetchedUser.subscribers,
                    subscribedOn: fetchedUser.subscribedOn
                };
            })

            // switch subscription on user
            .addCase(handleSubscribtion.fulfilled, (state, { meta }) => {
                const subscriberId = meta.arg.subscriberId;
                const profileOwner = JSON.parse(JSON.stringify(current(state.profileOwner)));

                if (!profileOwner.subscribers.includes(subscriberId)) {
                    profileOwner.subscribers.push(subscriberId);
                } else {
                    profileOwner.subscribers.splice(profileOwner.subscribers.indexOf(subscriberId), 1);
                }

                state.profileOwner = profileOwner;
            });
    }
});


const {reducer, actions} = profileCardSlice;

export default reducer;
export const {
    setIsLoading,
    setProfileOwner,
} = actions;