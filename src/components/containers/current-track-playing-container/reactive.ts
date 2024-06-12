import {makeVar} from "@apollo/client/index.js";
import {Post, User} from "@/utils/graphql-requests/generated/schema.ts";

export const currentTrackPlayingContainerState = makeVar<{
    post: Post | null;
    owner: User | null;
}>({
    post: null,
    owner: null,
});