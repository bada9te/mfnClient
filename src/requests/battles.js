import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


const httpGetAllBattlesByStatus = async(status, skipCount) => {
    const response = await axios.get(`${API_URL}/battles/all-with-status`, {
        params: {
            status: status,
            skipCount: skipCount,
        },
    });
    return response;
}

const httpCreateBattle = async(title, id1, id2) => {
    const response = await axios.post(`${API_URL}/battles/add`, {
        title: title,
        id1: id1,
        id2: id2,
    });
    return response;
}

const httpMakeVote = async(battleId, postNScore, voteCount, voterId) => {
    const response = await axios.post(`${API_URL}/battles/vote`, {
        battleId: battleId,
        postNScore: postNScore, 
        voteCount: voteCount,
        voterId: voterId,
    });
    return response;
}


export {
    httpGetAllBattlesByStatus,
    httpCreateBattle,
    httpMakeVote,
}