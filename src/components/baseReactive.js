import { makeVar } from "@apollo/client";

export const baseState = makeVar({
    user: {
        _id: '',
        email: '',
        nickname: '',
        description: '',
        aboutMe: '',
        avatar: '',
        background: '',
        subscribers: [],
        subscribedOn: [],
    },
    theme: JSON.parse(localStorage.getItem('mfnCurrentUser'))?.theme || 'light',
    locations: {
        images: `${process.env.REACT_APP_SERVER_BASE}/uploads/images`,
        audios: `${process.env.REACT_APP_SERVER_BASE}/uploads/audios`,
        others: `${process.env.REACT_APP_SERVER_BASE}/uploads/others`,
    },
});