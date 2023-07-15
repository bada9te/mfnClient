import { httpGetUserById } from "../requests/users";
import { init } from "../components/forms/baseSlice";
import { store } from "./store";

// for user fetching
const getUser = async(id) => {
    const result = await httpGetUserById(id);
    if (result.data.done) {
        return result.data.user;
    }
    return null;
}

// init redux state
const reduxStateInit = async() => {
    let localState = JSON.parse(localStorage.getItem('MusicFromNothing'));
    let defaultState = {
        user: localState?.user?._id || null,
        theme: localState?.theme || 'light',
        locations: {
            images: `${process.env.REACT_APP_API_URL}/uploads/images`,
            audios: `${process.env.REACT_APP_API_URL}/uploads/audios`,
            others: `${process.env.REACT_APP_API_URL}/uploads/others`,
        },
    };


    // set initial state
    if (localState.user.id) {
        const user = await getUser(localState.user.id);
        defaultState.user = user;
        store.dispatch(init(defaultState));
    } else {
        store.dispatch(init(defaultState));
    }
    //console.log(store.getState())
}

// export
export default reduxStateInit;