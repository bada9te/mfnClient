import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AccountConfirmInput = {
  actionId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  verifyToken: Scalars['String']['input'];
};

export type AccountRestoreInput = {
  actionId: Scalars['ID']['input'];
  newValue: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  verifyToken: Scalars['String']['input'];
};

export type Achievement = {
  __typename?: 'Achievement';
  _id: Scalars['ID']['output'];
  achievement?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  posNumber?: Maybe<Scalars['Int']['output']>;
  rarity?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type AddNewBattleByPostsIdsInput = {
  initiator: Scalars['ID']['input'];
  post1: Scalars['ID']['input'];
  post2: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type AddPostInput = {
  audio: Scalars['String']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  downloadsAllowed: Scalars['Boolean']['input'];
  image: Scalars['String']['input'];
  owner: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type AddUserInput = {
  email: Scalars['String']['input'];
  nick: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Battle = {
  __typename?: 'Battle';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  finished: Scalars['Boolean']['output'];
  post1?: Maybe<Post>;
  post1Score: Scalars['Int']['output'];
  post2?: Maybe<Post>;
  post2Score: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  votedBy?: Maybe<Array<User>>;
  willFinishAt: Scalars['String']['output'];
  winner?: Maybe<Post>;
};

export type BattlesWithCount = {
  __typename?: 'BattlesWithCount';
  battles?: Maybe<Array<Battle>>;
  count: Scalars['Int']['output'];
};

export type CreateModerationActionInput = {
  type: Scalars['String']['input'];
  user: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  post?: InputMaybe<Scalars['ID']['input']>;
  receiver: Scalars['ID']['input'];
  sender?: InputMaybe<Scalars['ID']['input']>;
  text: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreatePlaylistInput = {
  owner: Scalars['ID']['input'];
  public: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type CreateReportInput = {
  contactReason: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  reportOwner?: InputMaybe<Scalars['ID']['input']>;
  reportedPost?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateSupportRequestInput = {
  contactReason: Scalars['String']['input'];
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
};

export type LinkGoogleInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type LinkTwitterOrFacebookInput = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MakeBattleVoteInput = {
  battleId: Scalars['ID']['input'];
  postNScore: Scalars['String']['input'];
  voteCount: Scalars['Int']['input'];
  voterId: Scalars['ID']['input'];
};

export type ModerateActionInput = {
  actionId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  verifyToken: Scalars['String']['input'];
};

export type ModerationAction = {
  __typename?: 'ModerationAction';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: User;
  verifyToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  battleCreate: Battle;
  battleDeleteById: Battle;
  battleMakeVote: Battle;
  login?: Maybe<User>;
  moderationActionCreate: ModerationAction;
  moderationActionDelete: ModerationAction;
  notificationCreate: Notification;
  notificationDeleteById: Notification;
  notificationMarkAsReadById: Notification;
  notificationsDeleteByIds: NotificationCount;
  notificationsMarkAsReadByIds: NotificationCount;
  playlistCreate: Playlist;
  playlistDeleteById: Playlist;
  playlistSwicthTrack: Playlist;
  postCreate: Post;
  postDeleteById: Post;
  postSwicthInSaved: Post;
  postSwitchLike: Post;
  postUpdate: Post;
  reportClose: Report;
  reportCreate: Report;
  supportRequestClose: SupportRequest;
  supportRequestCreate: SupportRequest;
  userConfirmAccount: UserWithAction;
  userCreate: UserWithAction;
  userDeleteById: User;
  userLinkFacebook?: Maybe<User>;
  userLinkGoogle?: Maybe<User>;
  userLinkTwitter?: Maybe<User>;
  userPrepareAccountToRestore: UserWithAction;
  userRestoreAccount: UserWithAction;
  userSwitchSubscription: TwoUsers;
  userUnlinkFacebook?: Maybe<User>;
  userUnlinkGoogle?: Maybe<User>;
  userUnlinkTwitter?: Maybe<User>;
  userUpdate: User;
};


export type MutationBattleCreateArgs = {
  input: AddNewBattleByPostsIdsInput;
};


export type MutationBattleDeleteByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationBattleMakeVoteArgs = {
  input: MakeBattleVoteInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationModerationActionCreateArgs = {
  input: CreateModerationActionInput;
};


export type MutationModerationActionDeleteArgs = {
  input: ModerateActionInput;
};


export type MutationNotificationCreateArgs = {
  input: CreateNotificationInput;
};


export type MutationNotificationDeleteByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationNotificationMarkAsReadByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationNotificationsDeleteByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationNotificationsMarkAsReadByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationPlaylistCreateArgs = {
  input: CreatePlaylistInput;
};


export type MutationPlaylistDeleteByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationPlaylistSwicthTrackArgs = {
  input?: InputMaybe<SwitchTrackInPlaylistInput>;
};


export type MutationPostCreateArgs = {
  input: AddPostInput;
};


export type MutationPostDeleteByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationPostSwicthInSavedArgs = {
  input: SwitchLikeOrPostInSavedInput;
};


export type MutationPostSwitchLikeArgs = {
  input: SwitchLikeOrPostInSavedInput;
};


export type MutationPostUpdateArgs = {
  input: UpdatePostInput;
};


export type MutationReportCloseArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationReportCreateArgs = {
  input: CreateReportInput;
};


export type MutationSupportRequestCloseArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationSupportRequestCreateArgs = {
  input: CreateSupportRequestInput;
};


export type MutationUserConfirmAccountArgs = {
  input: AccountConfirmInput;
};


export type MutationUserCreateArgs = {
  input: AddUserInput;
};


export type MutationUserDeleteByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUserLinkFacebookArgs = {
  input: LinkTwitterOrFacebookInput;
};


export type MutationUserLinkGoogleArgs = {
  input: LinkGoogleInput;
};


export type MutationUserLinkTwitterArgs = {
  input: LinkTwitterOrFacebookInput;
};


export type MutationUserPrepareAccountToRestoreArgs = {
  input?: InputMaybe<PrepareAccountToRestoreInput>;
};


export type MutationUserRestoreAccountArgs = {
  input: AccountRestoreInput;
};


export type MutationUserSwitchSubscriptionArgs = {
  input: SwitchSubscriptionOnUserInput;
};


export type MutationUserUnlinkFacebookArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUserUnlinkGoogleArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUserUnlinkTwitterArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUserUpdateArgs = {
  input: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID']['output'];
  battle?: Maybe<Battle>;
  checked: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  post?: Maybe<Post>;
  receiver: User;
  sender?: Maybe<User>;
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  count: Scalars['Int']['output'];
};

export type NotificationsWithCount = {
  __typename?: 'NotificationsWithCount';
  count: Scalars['Int']['output'];
  notifications?: Maybe<Array<Notification>>;
};

export type Playlist = {
  __typename?: 'Playlist';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  owner: User;
  public: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  tracks?: Maybe<Array<Post>>;
};

export type PlaylistsWithCount = {
  __typename?: 'PlaylistsWithCount';
  count: Scalars['Int']['output'];
  playlists?: Maybe<Array<Playlist>>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  audio: Scalars['String']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  downloadsAllowed: Scalars['Boolean']['output'];
  image: Scalars['String']['output'];
  likedBy?: Maybe<Array<User>>;
  owner: User;
  savedBy?: Maybe<Array<User>>;
  title: Scalars['String']['output'];
};

export type PostsByCategoryCount = {
  __typename?: 'PostsByCategoryCount';
  blues: Scalars['Int']['output'];
  classical: Scalars['Int']['output'];
  country: Scalars['Int']['output'];
  electronic: Scalars['Int']['output'];
  folk: Scalars['Int']['output'];
  funk: Scalars['Int']['output'];
  hipHop: Scalars['Int']['output'];
  jazz: Scalars['Int']['output'];
  latin: Scalars['Int']['output'];
  metal: Scalars['Int']['output'];
  pop: Scalars['Int']['output'];
  reggae: Scalars['Int']['output'];
  rock: Scalars['Int']['output'];
  soul: Scalars['Int']['output'];
};

export type PostsByTitleInput = {
  title: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  userIsOwner?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostsWithCount = {
  __typename?: 'PostsWithCount';
  count: Scalars['Int']['output'];
  posts?: Maybe<Array<Post>>;
};

export type PrepareAccountToRestoreInput = {
  email: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  achievemenmtsCount: Scalars['Int']['output'];
  achievementsByIds?: Maybe<Array<Achievement>>;
  achievementsByPos?: Maybe<Array<Achievement>>;
  allAchievements?: Maybe<Array<Achievement>>;
  battleById: Battle;
  battlesByStatus: BattlesWithCount;
  moderationActionValidate: ModerationAction;
  notifications: NotificationsWithCount;
  notificationsByIds?: Maybe<Array<Notification>>;
  playlist: Playlist;
  playlistsByOwnerId: PlaylistsWithCount;
  playlistsByTitle?: Maybe<Array<Playlist>>;
  playlistsPublicAvailable: PlaylistsWithCount;
  post: Post;
  posts: PostsWithCount;
  postsByCategory: PostsWithCount;
  postsByCategoryCount: PostsByCategoryCount;
  postsByIds?: Maybe<Array<Post>>;
  postsByOwner: PostsWithCount;
  postsByTitle?: Maybe<Array<Post>>;
  postsMostPopular?: Maybe<Array<Post>>;
  postsSavedByUser: PostsWithCount;
  report?: Maybe<Report>;
  reports?: Maybe<Array<Report>>;
  supportRequest?: Maybe<SupportRequest>;
  supportRequests: Array<SupportRequest>;
  user: User;
  userAchievementsData?: Maybe<UserAchievementsData>;
  userByEmail: User;
  users?: Maybe<Array<User>>;
  usersByIds: Array<User>;
  usersByNickname: Array<User>;
  whoAmI?: Maybe<User>;
};


export type QueryAchievementsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryAchievementsByPosArgs = {
  pos: Array<Scalars['Int']['input']>;
};


export type QueryBattleByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryBattlesByStatusArgs = {
  finished: Scalars['Boolean']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryModerationActionValidateArgs = {
  input: ModerateActionInput;
};


export type QueryNotificationsArgs = {
  checked: Scalars['Boolean']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  receiverId: Scalars['ID']['input'];
};


export type QueryNotificationsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryPlaylistArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryPlaylistsByOwnerIdArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  owner: Scalars['ID']['input'];
};


export type QueryPlaylistsByTitleArgs = {
  title: Scalars['String']['input'];
};


export type QueryPlaylistsPublicAvailableArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPostsByCategoryArgs = {
  category: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryPostsByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryPostsByOwnerArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  owner: Scalars['ID']['input'];
};


export type QueryPostsByTitleArgs = {
  input: PostsByTitleInput;
};


export type QueryPostsMostPopularArgs = {
  date: Scalars['Date']['input'];
};


export type QueryPostsSavedByUserArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  user: Scalars['ID']['input'];
};


export type QueryReportArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryReportsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QuerySupportRequestArgs = {
  _id: Scalars['ID']['input'];
};


export type QuerySupportRequestsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserAchievementsDataArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUsersByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryUsersByNicknameArgs = {
  nick: Scalars['String']['input'];
};

export type Range = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['ID']['output'];
  contactReason: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  isClosed: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  reportOwner?: Maybe<User>;
  reportedPost?: Maybe<Post>;
};

export type SocialMediaData = {
  __typename?: 'SocialMediaData';
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SupportRequest = {
  __typename?: 'SupportRequest';
  _id: Scalars['ID']['output'];
  contactReason: Scalars['String']['output'];
  email: Scalars['String']['output'];
  isClosed: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
};

export type SwitchLikeOrPostInSavedInput = {
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type SwitchSubscriptionOnUserInput = {
  subscriberId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type SwitchTrackInPlaylistInput = {
  playlistId: Scalars['ID']['input'];
  trackId: Scalars['ID']['input'];
};

export type TwoUsers = {
  __typename?: 'TwoUsers';
  subscribeOn: User;
  subscriber: User;
};

export type UpdatePostInput = {
  post: Scalars['ID']['input'];
  value: Scalars['String']['input'];
  what: Scalars['String']['input'];
};

export type UpdateUserInput = {
  _id: Scalars['ID']['input'];
  value: Scalars['String']['input'];
  what: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  achievements?: Maybe<Array<Scalars['Int']['output']>>;
  avatar: Scalars['String']['output'];
  background: Scalars['String']['output'];
  description: Scalars['String']['output'];
  facebook?: Maybe<SocialMediaData>;
  google?: Maybe<SocialMediaData>;
  level: Scalars['Int']['output'];
  local?: Maybe<SocialMediaData>;
  nick: Scalars['String']['output'];
  subscribedOn?: Maybe<Array<User>>;
  subscribers?: Maybe<Array<User>>;
  twitter?: Maybe<SocialMediaData>;
};

export type UserAchievementsData = {
  __typename?: 'UserAchievementsData';
  achievements?: Maybe<Array<Scalars['Int']['output']>>;
  maxLikesByPost: Scalars['Int']['output'];
  maxLikesPostId?: Maybe<Scalars['String']['output']>;
  maxSavesByPost: Scalars['Int']['output'];
  maxSavesPostId?: Maybe<Scalars['String']['output']>;
  postCount: Scalars['Int']['output'];
  totalLikes: Scalars['Int']['output'];
  totalSaves: Scalars['Int']['output'];
};

export type UserWithAction = {
  __typename?: 'UserWithAction';
  action: ModerationAction;
  user: User;
};

export type CoreAchievementFieldsFragment = { __typename?: 'Achievement', _id: string, title?: string | null, achievement?: string | null, description?: string | null, type?: string | null, rarity?: string | null, posNumber?: number | null };

export type AllAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAchievementsQuery = { __typename?: 'Query', allAchievements?: Array<{ __typename?: 'Achievement', _id: string, title?: string | null, achievement?: string | null, description?: string | null, type?: string | null, rarity?: string | null, posNumber?: number | null }> | null };

export type AchievementsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AchievementsByIdsQuery = { __typename?: 'Query', achievementsByIds?: Array<{ __typename?: 'Achievement', _id: string, title?: string | null, achievement?: string | null, description?: string | null, type?: string | null, rarity?: string | null, posNumber?: number | null }> | null };

export type AchievementsByPosQueryVariables = Exact<{
  pos: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type AchievementsByPosQuery = { __typename?: 'Query', achievementsByPos?: Array<{ __typename?: 'Achievement', _id: string, title?: string | null, achievement?: string | null, description?: string | null, type?: string | null, rarity?: string | null, posNumber?: number | null }> | null };

export type AchievemenmtsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type AchievemenmtsCountQuery = { __typename?: 'Query', achievemenmtsCount: number };

export type CoreBattleFieldsFragment = { __typename?: 'Battle', _id: string, title: string, createdAt: string, willFinishAt: string, finished: boolean, post1Score: number, post2Score: number, post1?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, post2?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, winner?: { __typename?: 'Post', _id: string } | null, votedBy?: Array<{ __typename?: 'User', _id: string }> | null };

export type BattlesByStatusQueryVariables = Exact<{
  finished: Scalars['Boolean']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type BattlesByStatusQuery = { __typename?: 'Query', battlesByStatus: { __typename?: 'BattlesWithCount', count: number, battles?: Array<{ __typename?: 'Battle', _id: string, title: string, createdAt: string, willFinishAt: string, finished: boolean, post1Score: number, post2Score: number, post1?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, post2?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, winner?: { __typename?: 'Post', _id: string } | null, votedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type BattleByIdQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type BattleByIdQuery = { __typename?: 'Query', battleById: { __typename?: 'Battle', _id: string, title: string, createdAt: string, willFinishAt: string, finished: boolean, post1Score: number, post2Score: number, post1?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, post2?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, winner?: { __typename?: 'Post', _id: string } | null, votedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type BattleMakeVoteMutationVariables = Exact<{
  input: MakeBattleVoteInput;
}>;


export type BattleMakeVoteMutation = { __typename?: 'Mutation', battleMakeVote: { __typename?: 'Battle', _id: string, title: string, createdAt: string, willFinishAt: string, finished: boolean, post1Score: number, post2Score: number, post1?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, post2?: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } | null, winner?: { __typename?: 'Post', _id: string } | null, votedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type BattleCreateMutationVariables = Exact<{
  input: AddNewBattleByPostsIdsInput;
}>;


export type BattleCreateMutation = { __typename?: 'Mutation', battleCreate: { __typename?: 'Battle', _id: string } };

export type ModerationActionValidateQueryVariables = Exact<{
  input: ModerateActionInput;
}>;


export type ModerationActionValidateQuery = { __typename?: 'Query', moderationActionValidate: { __typename?: 'ModerationAction', _id: string } };

export type ModerationActionCreateMutationVariables = Exact<{
  input: CreateModerationActionInput;
}>;


export type ModerationActionCreateMutation = { __typename?: 'Mutation', moderationActionCreate: { __typename?: 'ModerationAction', _id: string } };

export type ModerationActionDeleteMutationVariables = Exact<{
  input: ModerateActionInput;
}>;


export type ModerationActionDeleteMutation = { __typename?: 'Mutation', moderationActionDelete: { __typename?: 'ModerationAction', _id: string } };

export type CoreNotificationFieldsFragment = { __typename?: 'Notification', _id: string, text: string, type: string, checked: boolean, createdAt: string, receiver: { __typename?: 'User', _id: string, nick: string, avatar: string }, sender?: { __typename?: 'User', _id: string, nick: string, avatar: string } | null, post?: { __typename?: 'Post', _id: string, title: string } | null, battle?: { __typename?: 'Battle', _id: string, title: string } | null };

export type NotificationsQueryVariables = Exact<{
  receiverId: Scalars['ID']['input'];
  checked: Scalars['Boolean']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationsWithCount', count: number, notifications?: Array<{ __typename?: 'Notification', _id: string, text: string, type: string, checked: boolean, createdAt: string, receiver: { __typename?: 'User', _id: string, nick: string, avatar: string }, sender?: { __typename?: 'User', _id: string, nick: string, avatar: string } | null, post?: { __typename?: 'Post', _id: string, title: string } | null, battle?: { __typename?: 'Battle', _id: string, title: string } | null }> | null } };

export type NotificationCreateMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type NotificationCreateMutation = { __typename?: 'Mutation', notificationCreate: { __typename?: 'Notification', _id: string } };

export type NotificationDeleteByIdMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type NotificationDeleteByIdMutation = { __typename?: 'Mutation', notificationDeleteById: { __typename?: 'Notification', _id: string } };

export type NotificationsDeleteByIdsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type NotificationsDeleteByIdsMutation = { __typename?: 'Mutation', notificationsDeleteByIds: { __typename?: 'NotificationCount', count: number } };

export type NotificationMarkAsReadByIdMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type NotificationMarkAsReadByIdMutation = { __typename?: 'Mutation', notificationMarkAsReadById: { __typename?: 'Notification', _id: string } };

export type NotificationsMarkAsReadByIdsMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type NotificationsMarkAsReadByIdsMutation = { __typename?: 'Mutation', notificationsMarkAsReadByIds: { __typename?: 'NotificationCount', count: number } };

export type CorePlaylistFieldsFragment = { __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null };

export type PlaylistQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type PlaylistQuery = { __typename?: 'Query', playlist: { __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PlaylistsByOwnerIdQueryVariables = Exact<{
  owner: Scalars['ID']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PlaylistsByOwnerIdQuery = { __typename?: 'Query', playlistsByOwnerId: { __typename?: 'PlaylistsWithCount', count: number, playlists?: Array<{ __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null }> | null } };

export type PlaylistsPublicAvailableQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PlaylistsPublicAvailableQuery = { __typename?: 'Query', playlistsPublicAvailable: { __typename?: 'PlaylistsWithCount', count: number, playlists?: Array<{ __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null }> | null } };

export type PlaylistCreateMutationVariables = Exact<{
  input: CreatePlaylistInput;
}>;


export type PlaylistCreateMutation = { __typename?: 'Mutation', playlistCreate: { __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PlaylistDeleteByIdMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type PlaylistDeleteByIdMutation = { __typename?: 'Mutation', playlistDeleteById: { __typename?: 'Playlist', _id: string } };

export type PlaylistSwicthTrackMutationVariables = Exact<{
  input: SwitchTrackInPlaylistInput;
}>;


export type PlaylistSwicthTrackMutation = { __typename?: 'Mutation', playlistSwicthTrack: { __typename?: 'Playlist', _id: string, title: string, public: boolean, createdAt: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, tracks?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, nick: string, avatar: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type CorePostFieldsFragment = { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null };

export type PostQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type PostsQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsWithCount', count: number, posts?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PostsByOwnerQueryVariables = Exact<{
  owner: Scalars['ID']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PostsByOwnerQuery = { __typename?: 'Query', postsByOwner: { __typename?: 'PostsWithCount', count: number, posts?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PostsSavedByUserQueryVariables = Exact<{
  user: Scalars['ID']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PostsSavedByUserQuery = { __typename?: 'Query', postsSavedByUser: { __typename?: 'PostsWithCount', count: number, posts?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PostsByTitleQueryVariables = Exact<{
  input: PostsByTitleInput;
}>;


export type PostsByTitleQuery = { __typename?: 'Query', postsByTitle?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null };

export type PostsByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type PostsByIdsQuery = { __typename?: 'Query', postsByIds?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null };

export type PostsMostPopularQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type PostsMostPopularQuery = { __typename?: 'Query', postsMostPopular?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null };

export type PostsByCategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PostsByCategoryQuery = { __typename?: 'Query', postsByCategory: { __typename?: 'PostsWithCount', count: number, posts?: Array<{ __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null }> | null } };

export type PostsByCategoryCountQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsByCategoryCountQuery = { __typename?: 'Query', postsByCategoryCount: { __typename?: 'PostsByCategoryCount', country: number, pop: number, classical: number, funk: number, soul: number, hipHop: number, rock: number, electronic: number, latin: number, jazz: number, blues: number, folk: number, metal: number, reggae: number } };

export type PostCreateMutationVariables = Exact<{
  input: AddPostInput;
}>;


export type PostCreateMutation = { __typename?: 'Mutation', postCreate: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type PostDeleteByIdMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type PostDeleteByIdMutation = { __typename?: 'Mutation', postDeleteById: { __typename?: 'Post', _id: string, title: string } };

export type PostSwitchLikeMutationVariables = Exact<{
  input: SwitchLikeOrPostInSavedInput;
}>;


export type PostSwitchLikeMutation = { __typename?: 'Mutation', postSwitchLike: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type PostSwicthInSavedMutationVariables = Exact<{
  input: SwitchLikeOrPostInSavedInput;
}>;


export type PostSwicthInSavedMutation = { __typename?: 'Mutation', postSwicthInSaved: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type PostUpdateMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type PostUpdateMutation = { __typename?: 'Mutation', postUpdate: { __typename?: 'Post', _id: string, title: string, description: string, createdAt: string, image: string, audio: string, downloadsAllowed: boolean, category: string, owner: { __typename?: 'User', _id: string, avatar: string, nick: string }, savedBy?: Array<{ __typename?: 'User', _id: string }> | null, likedBy?: Array<{ __typename?: 'User', _id: string }> | null } };

export type ReportCreateMutationVariables = Exact<{
  input: CreateReportInput;
}>;


export type ReportCreateMutation = { __typename?: 'Mutation', reportCreate: { __typename?: 'Report', _id: string } };

export type SupportRequestCreateMutationVariables = Exact<{
  input: CreateSupportRequestInput;
}>;


export type SupportRequestCreateMutation = { __typename?: 'Mutation', supportRequestCreate: { __typename?: 'SupportRequest', _id: string } };

export type SupportRequestCloseMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type SupportRequestCloseMutation = { __typename?: 'Mutation', supportRequestClose: { __typename?: 'SupportRequest', _id: string } };

export type CoreUserFieldsFragment = { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number };

export type UserQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number, local?: { __typename?: 'SocialMediaData', email?: string | null } | null, google?: { __typename?: 'SocialMediaData', email?: string | null } | null, facebook?: { __typename?: 'SocialMediaData', name?: string | null } | null, twitter?: { __typename?: 'SocialMediaData', name?: string | null } | null, subscribedOn?: Array<{ __typename?: 'User', _id: string }> | null, subscribers?: Array<{ __typename?: 'User', _id: string }> | null } };

export type UsersByNicknameQueryVariables = Exact<{
  nick: Scalars['String']['input'];
}>;


export type UsersByNicknameQuery = { __typename?: 'Query', usersByNickname: Array<{ __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number, subscribedOn?: Array<{ __typename?: 'User', _id: string }> | null, subscribers?: Array<{ __typename?: 'User', _id: string }> | null }> };

export type UsersByIdsQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type UsersByIdsQuery = { __typename?: 'Query', usersByIds: Array<{ __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number }> };

export type UserAchievementsDataQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserAchievementsDataQuery = { __typename?: 'Query', userAchievementsData?: { __typename?: 'UserAchievementsData', achievements?: Array<number> | null, totalLikes: number, totalSaves: number, maxLikesByPost: number, maxSavesByPost: number, postCount: number, maxLikesPostId?: string | null, maxSavesPostId?: string | null } | null };

export type UserCreateMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate: { __typename?: 'UserWithAction', user: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number }, action: { __typename?: 'ModerationAction', _id: string } } };

export type UserDeleteByIdMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserDeleteByIdMutation = { __typename?: 'Mutation', userDeleteById: { __typename?: 'User', _id: string } };

export type UserSwitchSubscriptionMutationVariables = Exact<{
  input: SwitchSubscriptionOnUserInput;
}>;


export type UserSwitchSubscriptionMutation = { __typename?: 'Mutation', userSwitchSubscription: { __typename?: 'TwoUsers', subscriber: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number, subscribedOn?: Array<{ __typename?: 'User', _id: string }> | null, subscribers?: Array<{ __typename?: 'User', _id: string }> | null }, subscribeOn: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number, subscribedOn?: Array<{ __typename?: 'User', _id: string }> | null, subscribers?: Array<{ __typename?: 'User', _id: string }> | null } } };

export type UserUpdateMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', userUpdate: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } };

export type UserPrepareAccountToRestoreMutationVariables = Exact<{
  input: PrepareAccountToRestoreInput;
}>;


export type UserPrepareAccountToRestoreMutation = { __typename?: 'Mutation', userPrepareAccountToRestore: { __typename?: 'UserWithAction', user: { __typename?: 'User', _id: string }, action: { __typename?: 'ModerationAction', _id: string } } };

export type UserConfirmAccountMutationVariables = Exact<{
  input: AccountConfirmInput;
}>;


export type UserConfirmAccountMutation = { __typename?: 'Mutation', userConfirmAccount: { __typename?: 'UserWithAction', user: { __typename?: 'User', _id: string }, action: { __typename?: 'ModerationAction', _id: string } } };

export type UserRestoreAccountMutationVariables = Exact<{
  input: AccountRestoreInput;
}>;


export type UserRestoreAccountMutation = { __typename?: 'Mutation', userRestoreAccount: { __typename?: 'UserWithAction', user: { __typename?: 'User', _id: string }, action: { __typename?: 'ModerationAction', _id: string } } };

export type UserLinkGoogleMutationVariables = Exact<{
  input: LinkGoogleInput;
}>;


export type UserLinkGoogleMutation = { __typename?: 'Mutation', userLinkGoogle?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export type UserUnlinkGoogleMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserUnlinkGoogleMutation = { __typename?: 'Mutation', userUnlinkGoogle?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export type UserLinkFacebookMutationVariables = Exact<{
  input: LinkTwitterOrFacebookInput;
}>;


export type UserLinkFacebookMutation = { __typename?: 'Mutation', userLinkFacebook?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export type UserUnlinkFacebookMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserUnlinkFacebookMutation = { __typename?: 'Mutation', userUnlinkFacebook?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export type UserLinkTwitterMutationVariables = Exact<{
  input: LinkTwitterOrFacebookInput;
}>;


export type UserLinkTwitterMutation = { __typename?: 'Mutation', userLinkTwitter?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export type UserUnlinkTwitterMutationVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;


export type UserUnlinkTwitterMutation = { __typename?: 'Mutation', userUnlinkTwitter?: { __typename?: 'User', _id: string, nick: string, description: string, avatar: string, background: string, achievements?: Array<number> | null, level: number } | null };

export const CoreAchievementFieldsFragmentDoc = gql`
    fragment CoreAchievementFields on Achievement {
  _id
  title
  achievement
  description
  type
  rarity
  posNumber
}
    `;
export const CorePostFieldsFragmentDoc = gql`
    fragment CorePostFields on Post {
  _id
  title
  description
  savedBy {
    _id
  }
  likedBy {
    _id
  }
  createdAt
  image
  audio
  downloadsAllowed
  category
}
    `;
export const CoreBattleFieldsFragmentDoc = gql`
    fragment CoreBattleFields on Battle {
  _id
  title
  post1 {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
  post2 {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
  winner {
    _id
  }
  createdAt
  willFinishAt
  finished
  votedBy {
    _id
  }
  post1Score
  post2Score
}
    ${CorePostFieldsFragmentDoc}`;
export const CoreNotificationFieldsFragmentDoc = gql`
    fragment CoreNotificationFields on Notification {
  _id
  receiver {
    _id
    nick
    avatar
  }
  sender {
    _id
    nick
    avatar
  }
  post {
    _id
    title
  }
  battle {
    _id
    title
  }
  text
  type
  checked
  createdAt
}
    `;
export const CorePlaylistFieldsFragmentDoc = gql`
    fragment CorePlaylistFields on Playlist {
  _id
  title
  tracks {
    ...CorePostFields
    owner {
      _id
      nick
      avatar
    }
  }
  public
  createdAt
}
    ${CorePostFieldsFragmentDoc}`;
export const CoreUserFieldsFragmentDoc = gql`
    fragment CoreUserFields on User {
  _id
  nick
  description
  avatar
  background
  achievements
  level
}
    `;
export const AllAchievementsDocument = gql`
    query allAchievements {
  allAchievements {
    ...CoreAchievementFields
  }
}
    ${CoreAchievementFieldsFragmentDoc}`;

/**
 * __useAllAchievementsQuery__
 *
 * To run a query within a React component, call `useAllAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<AllAchievementsQuery, AllAchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAchievementsQuery, AllAchievementsQueryVariables>(AllAchievementsDocument, options);
      }
export function useAllAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAchievementsQuery, AllAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAchievementsQuery, AllAchievementsQueryVariables>(AllAchievementsDocument, options);
        }
export function useAllAchievementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllAchievementsQuery, AllAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllAchievementsQuery, AllAchievementsQueryVariables>(AllAchievementsDocument, options);
        }
export type AllAchievementsQueryHookResult = ReturnType<typeof useAllAchievementsQuery>;
export type AllAchievementsLazyQueryHookResult = ReturnType<typeof useAllAchievementsLazyQuery>;
export type AllAchievementsSuspenseQueryHookResult = ReturnType<typeof useAllAchievementsSuspenseQuery>;
export type AllAchievementsQueryResult = Apollo.QueryResult<AllAchievementsQuery, AllAchievementsQueryVariables>;
export const AchievementsByIdsDocument = gql`
    query achievementsByIds($ids: [ID!]!) {
  achievementsByIds(ids: $ids) {
    ...CoreAchievementFields
  }
}
    ${CoreAchievementFieldsFragmentDoc}`;

/**
 * __useAchievementsByIdsQuery__
 *
 * To run a query within a React component, call `useAchievementsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievementsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievementsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAchievementsByIdsQuery(baseOptions: Apollo.QueryHookOptions<AchievementsByIdsQuery, AchievementsByIdsQueryVariables> & ({ variables: AchievementsByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>(AchievementsByIdsDocument, options);
      }
export function useAchievementsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>(AchievementsByIdsDocument, options);
        }
export function useAchievementsByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>(AchievementsByIdsDocument, options);
        }
export type AchievementsByIdsQueryHookResult = ReturnType<typeof useAchievementsByIdsQuery>;
export type AchievementsByIdsLazyQueryHookResult = ReturnType<typeof useAchievementsByIdsLazyQuery>;
export type AchievementsByIdsSuspenseQueryHookResult = ReturnType<typeof useAchievementsByIdsSuspenseQuery>;
export type AchievementsByIdsQueryResult = Apollo.QueryResult<AchievementsByIdsQuery, AchievementsByIdsQueryVariables>;
export const AchievementsByPosDocument = gql`
    query achievementsByPos($pos: [Int!]!) {
  achievementsByPos(pos: $pos) {
    ...CoreAchievementFields
  }
}
    ${CoreAchievementFieldsFragmentDoc}`;

/**
 * __useAchievementsByPosQuery__
 *
 * To run a query within a React component, call `useAchievementsByPosQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievementsByPosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievementsByPosQuery({
 *   variables: {
 *      pos: // value for 'pos'
 *   },
 * });
 */
export function useAchievementsByPosQuery(baseOptions: Apollo.QueryHookOptions<AchievementsByPosQuery, AchievementsByPosQueryVariables> & ({ variables: AchievementsByPosQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AchievementsByPosQuery, AchievementsByPosQueryVariables>(AchievementsByPosDocument, options);
      }
export function useAchievementsByPosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AchievementsByPosQuery, AchievementsByPosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AchievementsByPosQuery, AchievementsByPosQueryVariables>(AchievementsByPosDocument, options);
        }
export function useAchievementsByPosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AchievementsByPosQuery, AchievementsByPosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AchievementsByPosQuery, AchievementsByPosQueryVariables>(AchievementsByPosDocument, options);
        }
export type AchievementsByPosQueryHookResult = ReturnType<typeof useAchievementsByPosQuery>;
export type AchievementsByPosLazyQueryHookResult = ReturnType<typeof useAchievementsByPosLazyQuery>;
export type AchievementsByPosSuspenseQueryHookResult = ReturnType<typeof useAchievementsByPosSuspenseQuery>;
export type AchievementsByPosQueryResult = Apollo.QueryResult<AchievementsByPosQuery, AchievementsByPosQueryVariables>;
export const AchievemenmtsCountDocument = gql`
    query achievemenmtsCount {
  achievemenmtsCount
}
    `;

/**
 * __useAchievemenmtsCountQuery__
 *
 * To run a query within a React component, call `useAchievemenmtsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievemenmtsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievemenmtsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAchievemenmtsCountQuery(baseOptions?: Apollo.QueryHookOptions<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>(AchievemenmtsCountDocument, options);
      }
export function useAchievemenmtsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>(AchievemenmtsCountDocument, options);
        }
export function useAchievemenmtsCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>(AchievemenmtsCountDocument, options);
        }
export type AchievemenmtsCountQueryHookResult = ReturnType<typeof useAchievemenmtsCountQuery>;
export type AchievemenmtsCountLazyQueryHookResult = ReturnType<typeof useAchievemenmtsCountLazyQuery>;
export type AchievemenmtsCountSuspenseQueryHookResult = ReturnType<typeof useAchievemenmtsCountSuspenseQuery>;
export type AchievemenmtsCountQueryResult = Apollo.QueryResult<AchievemenmtsCountQuery, AchievemenmtsCountQueryVariables>;
export const BattlesByStatusDocument = gql`
    query battlesByStatus($finished: Boolean!, $offset: Int!, $limit: Int!) {
  battlesByStatus(finished: $finished, offset: $offset, limit: $limit) {
    battles {
      ...CoreBattleFields
    }
    count
  }
}
    ${CoreBattleFieldsFragmentDoc}`;

/**
 * __useBattlesByStatusQuery__
 *
 * To run a query within a React component, call `useBattlesByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattlesByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattlesByStatusQuery({
 *   variables: {
 *      finished: // value for 'finished'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBattlesByStatusQuery(baseOptions: Apollo.QueryHookOptions<BattlesByStatusQuery, BattlesByStatusQueryVariables> & ({ variables: BattlesByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BattlesByStatusQuery, BattlesByStatusQueryVariables>(BattlesByStatusDocument, options);
      }
export function useBattlesByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BattlesByStatusQuery, BattlesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BattlesByStatusQuery, BattlesByStatusQueryVariables>(BattlesByStatusDocument, options);
        }
export function useBattlesByStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BattlesByStatusQuery, BattlesByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BattlesByStatusQuery, BattlesByStatusQueryVariables>(BattlesByStatusDocument, options);
        }
export type BattlesByStatusQueryHookResult = ReturnType<typeof useBattlesByStatusQuery>;
export type BattlesByStatusLazyQueryHookResult = ReturnType<typeof useBattlesByStatusLazyQuery>;
export type BattlesByStatusSuspenseQueryHookResult = ReturnType<typeof useBattlesByStatusSuspenseQuery>;
export type BattlesByStatusQueryResult = Apollo.QueryResult<BattlesByStatusQuery, BattlesByStatusQueryVariables>;
export const BattleByIdDocument = gql`
    query battleById($_id: ID!) {
  battleById(_id: $_id) {
    ...CoreBattleFields
  }
}
    ${CoreBattleFieldsFragmentDoc}`;

/**
 * __useBattleByIdQuery__
 *
 * To run a query within a React component, call `useBattleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBattleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBattleByIdQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useBattleByIdQuery(baseOptions: Apollo.QueryHookOptions<BattleByIdQuery, BattleByIdQueryVariables> & ({ variables: BattleByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BattleByIdQuery, BattleByIdQueryVariables>(BattleByIdDocument, options);
      }
export function useBattleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BattleByIdQuery, BattleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BattleByIdQuery, BattleByIdQueryVariables>(BattleByIdDocument, options);
        }
export function useBattleByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BattleByIdQuery, BattleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BattleByIdQuery, BattleByIdQueryVariables>(BattleByIdDocument, options);
        }
export type BattleByIdQueryHookResult = ReturnType<typeof useBattleByIdQuery>;
export type BattleByIdLazyQueryHookResult = ReturnType<typeof useBattleByIdLazyQuery>;
export type BattleByIdSuspenseQueryHookResult = ReturnType<typeof useBattleByIdSuspenseQuery>;
export type BattleByIdQueryResult = Apollo.QueryResult<BattleByIdQuery, BattleByIdQueryVariables>;
export const BattleMakeVoteDocument = gql`
    mutation battleMakeVote($input: MakeBattleVoteInput!) {
  battleMakeVote(input: $input) {
    ...CoreBattleFields
  }
}
    ${CoreBattleFieldsFragmentDoc}`;
export type BattleMakeVoteMutationFn = Apollo.MutationFunction<BattleMakeVoteMutation, BattleMakeVoteMutationVariables>;

/**
 * __useBattleMakeVoteMutation__
 *
 * To run a mutation, you first call `useBattleMakeVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBattleMakeVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [battleMakeVoteMutation, { data, loading, error }] = useBattleMakeVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBattleMakeVoteMutation(baseOptions?: Apollo.MutationHookOptions<BattleMakeVoteMutation, BattleMakeVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BattleMakeVoteMutation, BattleMakeVoteMutationVariables>(BattleMakeVoteDocument, options);
      }
export type BattleMakeVoteMutationHookResult = ReturnType<typeof useBattleMakeVoteMutation>;
export type BattleMakeVoteMutationResult = Apollo.MutationResult<BattleMakeVoteMutation>;
export type BattleMakeVoteMutationOptions = Apollo.BaseMutationOptions<BattleMakeVoteMutation, BattleMakeVoteMutationVariables>;
export const BattleCreateDocument = gql`
    mutation battleCreate($input: AddNewBattleByPostsIdsInput!) {
  battleCreate(input: $input) {
    _id
  }
}
    `;
export type BattleCreateMutationFn = Apollo.MutationFunction<BattleCreateMutation, BattleCreateMutationVariables>;

/**
 * __useBattleCreateMutation__
 *
 * To run a mutation, you first call `useBattleCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBattleCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [battleCreateMutation, { data, loading, error }] = useBattleCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBattleCreateMutation(baseOptions?: Apollo.MutationHookOptions<BattleCreateMutation, BattleCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BattleCreateMutation, BattleCreateMutationVariables>(BattleCreateDocument, options);
      }
export type BattleCreateMutationHookResult = ReturnType<typeof useBattleCreateMutation>;
export type BattleCreateMutationResult = Apollo.MutationResult<BattleCreateMutation>;
export type BattleCreateMutationOptions = Apollo.BaseMutationOptions<BattleCreateMutation, BattleCreateMutationVariables>;
export const ModerationActionValidateDocument = gql`
    query moderationActionValidate($input: ModerateActionInput!) {
  moderationActionValidate(input: $input) {
    _id
  }
}
    `;

/**
 * __useModerationActionValidateQuery__
 *
 * To run a query within a React component, call `useModerationActionValidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useModerationActionValidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModerationActionValidateQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModerationActionValidateQuery(baseOptions: Apollo.QueryHookOptions<ModerationActionValidateQuery, ModerationActionValidateQueryVariables> & ({ variables: ModerationActionValidateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>(ModerationActionValidateDocument, options);
      }
export function useModerationActionValidateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>(ModerationActionValidateDocument, options);
        }
export function useModerationActionValidateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>(ModerationActionValidateDocument, options);
        }
export type ModerationActionValidateQueryHookResult = ReturnType<typeof useModerationActionValidateQuery>;
export type ModerationActionValidateLazyQueryHookResult = ReturnType<typeof useModerationActionValidateLazyQuery>;
export type ModerationActionValidateSuspenseQueryHookResult = ReturnType<typeof useModerationActionValidateSuspenseQuery>;
export type ModerationActionValidateQueryResult = Apollo.QueryResult<ModerationActionValidateQuery, ModerationActionValidateQueryVariables>;
export const ModerationActionCreateDocument = gql`
    mutation moderationActionCreate($input: CreateModerationActionInput!) {
  moderationActionCreate(input: $input) {
    _id
  }
}
    `;
export type ModerationActionCreateMutationFn = Apollo.MutationFunction<ModerationActionCreateMutation, ModerationActionCreateMutationVariables>;

/**
 * __useModerationActionCreateMutation__
 *
 * To run a mutation, you first call `useModerationActionCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModerationActionCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moderationActionCreateMutation, { data, loading, error }] = useModerationActionCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModerationActionCreateMutation(baseOptions?: Apollo.MutationHookOptions<ModerationActionCreateMutation, ModerationActionCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModerationActionCreateMutation, ModerationActionCreateMutationVariables>(ModerationActionCreateDocument, options);
      }
export type ModerationActionCreateMutationHookResult = ReturnType<typeof useModerationActionCreateMutation>;
export type ModerationActionCreateMutationResult = Apollo.MutationResult<ModerationActionCreateMutation>;
export type ModerationActionCreateMutationOptions = Apollo.BaseMutationOptions<ModerationActionCreateMutation, ModerationActionCreateMutationVariables>;
export const ModerationActionDeleteDocument = gql`
    mutation moderationActionDelete($input: ModerateActionInput!) {
  moderationActionDelete(input: $input) {
    _id
  }
}
    `;
export type ModerationActionDeleteMutationFn = Apollo.MutationFunction<ModerationActionDeleteMutation, ModerationActionDeleteMutationVariables>;

/**
 * __useModerationActionDeleteMutation__
 *
 * To run a mutation, you first call `useModerationActionDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModerationActionDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moderationActionDeleteMutation, { data, loading, error }] = useModerationActionDeleteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModerationActionDeleteMutation(baseOptions?: Apollo.MutationHookOptions<ModerationActionDeleteMutation, ModerationActionDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModerationActionDeleteMutation, ModerationActionDeleteMutationVariables>(ModerationActionDeleteDocument, options);
      }
export type ModerationActionDeleteMutationHookResult = ReturnType<typeof useModerationActionDeleteMutation>;
export type ModerationActionDeleteMutationResult = Apollo.MutationResult<ModerationActionDeleteMutation>;
export type ModerationActionDeleteMutationOptions = Apollo.BaseMutationOptions<ModerationActionDeleteMutation, ModerationActionDeleteMutationVariables>;
export const NotificationsDocument = gql`
    query notifications($receiverId: ID!, $checked: Boolean!, $offset: Int!, $limit: Int!) {
  notifications(
    receiverId: $receiverId
    checked: $checked
    offset: $offset
    limit: $limit
  ) {
    notifications {
      ...CoreNotificationFields
    }
    count
  }
}
    ${CoreNotificationFieldsFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *      checked: // value for 'checked'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables> & ({ variables: NotificationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export function useNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const NotificationCreateDocument = gql`
    mutation notificationCreate($input: CreateNotificationInput!) {
  notificationCreate(input: $input) {
    _id
  }
}
    `;
export type NotificationCreateMutationFn = Apollo.MutationFunction<NotificationCreateMutation, NotificationCreateMutationVariables>;

/**
 * __useNotificationCreateMutation__
 *
 * To run a mutation, you first call `useNotificationCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationCreateMutation, { data, loading, error }] = useNotificationCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotificationCreateMutation(baseOptions?: Apollo.MutationHookOptions<NotificationCreateMutation, NotificationCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationCreateMutation, NotificationCreateMutationVariables>(NotificationCreateDocument, options);
      }
export type NotificationCreateMutationHookResult = ReturnType<typeof useNotificationCreateMutation>;
export type NotificationCreateMutationResult = Apollo.MutationResult<NotificationCreateMutation>;
export type NotificationCreateMutationOptions = Apollo.BaseMutationOptions<NotificationCreateMutation, NotificationCreateMutationVariables>;
export const NotificationDeleteByIdDocument = gql`
    mutation notificationDeleteById($_id: ID!) {
  notificationDeleteById(_id: $_id) {
    _id
  }
}
    `;
export type NotificationDeleteByIdMutationFn = Apollo.MutationFunction<NotificationDeleteByIdMutation, NotificationDeleteByIdMutationVariables>;

/**
 * __useNotificationDeleteByIdMutation__
 *
 * To run a mutation, you first call `useNotificationDeleteByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationDeleteByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationDeleteByIdMutation, { data, loading, error }] = useNotificationDeleteByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useNotificationDeleteByIdMutation(baseOptions?: Apollo.MutationHookOptions<NotificationDeleteByIdMutation, NotificationDeleteByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationDeleteByIdMutation, NotificationDeleteByIdMutationVariables>(NotificationDeleteByIdDocument, options);
      }
export type NotificationDeleteByIdMutationHookResult = ReturnType<typeof useNotificationDeleteByIdMutation>;
export type NotificationDeleteByIdMutationResult = Apollo.MutationResult<NotificationDeleteByIdMutation>;
export type NotificationDeleteByIdMutationOptions = Apollo.BaseMutationOptions<NotificationDeleteByIdMutation, NotificationDeleteByIdMutationVariables>;
export const NotificationsDeleteByIdsDocument = gql`
    mutation notificationsDeleteByIds($ids: [ID!]!) {
  notificationsDeleteByIds(ids: $ids) {
    count
  }
}
    `;
export type NotificationsDeleteByIdsMutationFn = Apollo.MutationFunction<NotificationsDeleteByIdsMutation, NotificationsDeleteByIdsMutationVariables>;

/**
 * __useNotificationsDeleteByIdsMutation__
 *
 * To run a mutation, you first call `useNotificationsDeleteByIdsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationsDeleteByIdsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationsDeleteByIdsMutation, { data, loading, error }] = useNotificationsDeleteByIdsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useNotificationsDeleteByIdsMutation(baseOptions?: Apollo.MutationHookOptions<NotificationsDeleteByIdsMutation, NotificationsDeleteByIdsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationsDeleteByIdsMutation, NotificationsDeleteByIdsMutationVariables>(NotificationsDeleteByIdsDocument, options);
      }
export type NotificationsDeleteByIdsMutationHookResult = ReturnType<typeof useNotificationsDeleteByIdsMutation>;
export type NotificationsDeleteByIdsMutationResult = Apollo.MutationResult<NotificationsDeleteByIdsMutation>;
export type NotificationsDeleteByIdsMutationOptions = Apollo.BaseMutationOptions<NotificationsDeleteByIdsMutation, NotificationsDeleteByIdsMutationVariables>;
export const NotificationMarkAsReadByIdDocument = gql`
    mutation notificationMarkAsReadById($_id: ID!) {
  notificationMarkAsReadById(_id: $_id) {
    _id
  }
}
    `;
export type NotificationMarkAsReadByIdMutationFn = Apollo.MutationFunction<NotificationMarkAsReadByIdMutation, NotificationMarkAsReadByIdMutationVariables>;

/**
 * __useNotificationMarkAsReadByIdMutation__
 *
 * To run a mutation, you first call `useNotificationMarkAsReadByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationMarkAsReadByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationMarkAsReadByIdMutation, { data, loading, error }] = useNotificationMarkAsReadByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useNotificationMarkAsReadByIdMutation(baseOptions?: Apollo.MutationHookOptions<NotificationMarkAsReadByIdMutation, NotificationMarkAsReadByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationMarkAsReadByIdMutation, NotificationMarkAsReadByIdMutationVariables>(NotificationMarkAsReadByIdDocument, options);
      }
export type NotificationMarkAsReadByIdMutationHookResult = ReturnType<typeof useNotificationMarkAsReadByIdMutation>;
export type NotificationMarkAsReadByIdMutationResult = Apollo.MutationResult<NotificationMarkAsReadByIdMutation>;
export type NotificationMarkAsReadByIdMutationOptions = Apollo.BaseMutationOptions<NotificationMarkAsReadByIdMutation, NotificationMarkAsReadByIdMutationVariables>;
export const NotificationsMarkAsReadByIdsDocument = gql`
    mutation notificationsMarkAsReadByIds($ids: [ID!]!) {
  notificationsMarkAsReadByIds(ids: $ids) {
    count
  }
}
    `;
export type NotificationsMarkAsReadByIdsMutationFn = Apollo.MutationFunction<NotificationsMarkAsReadByIdsMutation, NotificationsMarkAsReadByIdsMutationVariables>;

/**
 * __useNotificationsMarkAsReadByIdsMutation__
 *
 * To run a mutation, you first call `useNotificationsMarkAsReadByIdsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNotificationsMarkAsReadByIdsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [notificationsMarkAsReadByIdsMutation, { data, loading, error }] = useNotificationsMarkAsReadByIdsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useNotificationsMarkAsReadByIdsMutation(baseOptions?: Apollo.MutationHookOptions<NotificationsMarkAsReadByIdsMutation, NotificationsMarkAsReadByIdsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NotificationsMarkAsReadByIdsMutation, NotificationsMarkAsReadByIdsMutationVariables>(NotificationsMarkAsReadByIdsDocument, options);
      }
export type NotificationsMarkAsReadByIdsMutationHookResult = ReturnType<typeof useNotificationsMarkAsReadByIdsMutation>;
export type NotificationsMarkAsReadByIdsMutationResult = Apollo.MutationResult<NotificationsMarkAsReadByIdsMutation>;
export type NotificationsMarkAsReadByIdsMutationOptions = Apollo.BaseMutationOptions<NotificationsMarkAsReadByIdsMutation, NotificationsMarkAsReadByIdsMutationVariables>;
export const PlaylistDocument = gql`
    query playlist($_id: ID!) {
  playlist(_id: $_id) {
    ...CorePlaylistFields
    owner {
      _id
      nick
      avatar
    }
  }
}
    ${CorePlaylistFieldsFragmentDoc}`;

/**
 * __usePlaylistQuery__
 *
 * To run a query within a React component, call `usePlaylistQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function usePlaylistQuery(baseOptions: Apollo.QueryHookOptions<PlaylistQuery, PlaylistQueryVariables> & ({ variables: PlaylistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
      }
export function usePlaylistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
        }
export function usePlaylistSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaylistQuery, PlaylistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistQuery, PlaylistQueryVariables>(PlaylistDocument, options);
        }
export type PlaylistQueryHookResult = ReturnType<typeof usePlaylistQuery>;
export type PlaylistLazyQueryHookResult = ReturnType<typeof usePlaylistLazyQuery>;
export type PlaylistSuspenseQueryHookResult = ReturnType<typeof usePlaylistSuspenseQuery>;
export type PlaylistQueryResult = Apollo.QueryResult<PlaylistQuery, PlaylistQueryVariables>;
export const PlaylistsByOwnerIdDocument = gql`
    query playlistsByOwnerId($owner: ID!, $offset: Int!, $limit: Int!) {
  playlistsByOwnerId(owner: $owner, offset: $offset, limit: $limit) {
    playlists {
      ...CorePlaylistFields
      owner {
        _id
        nick
        avatar
      }
    }
    count
  }
}
    ${CorePlaylistFieldsFragmentDoc}`;

/**
 * __usePlaylistsByOwnerIdQuery__
 *
 * To run a query within a React component, call `usePlaylistsByOwnerIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsByOwnerIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsByOwnerIdQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePlaylistsByOwnerIdQuery(baseOptions: Apollo.QueryHookOptions<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables> & ({ variables: PlaylistsByOwnerIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>(PlaylistsByOwnerIdDocument, options);
      }
export function usePlaylistsByOwnerIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>(PlaylistsByOwnerIdDocument, options);
        }
export function usePlaylistsByOwnerIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>(PlaylistsByOwnerIdDocument, options);
        }
export type PlaylistsByOwnerIdQueryHookResult = ReturnType<typeof usePlaylistsByOwnerIdQuery>;
export type PlaylistsByOwnerIdLazyQueryHookResult = ReturnType<typeof usePlaylistsByOwnerIdLazyQuery>;
export type PlaylistsByOwnerIdSuspenseQueryHookResult = ReturnType<typeof usePlaylistsByOwnerIdSuspenseQuery>;
export type PlaylistsByOwnerIdQueryResult = Apollo.QueryResult<PlaylistsByOwnerIdQuery, PlaylistsByOwnerIdQueryVariables>;
export const PlaylistsPublicAvailableDocument = gql`
    query playlistsPublicAvailable($offset: Int!, $limit: Int!) {
  playlistsPublicAvailable(offset: $offset, limit: $limit) {
    playlists {
      ...CorePlaylistFields
      owner {
        _id
        nick
        avatar
      }
    }
    count
  }
}
    ${CorePlaylistFieldsFragmentDoc}`;

/**
 * __usePlaylistsPublicAvailableQuery__
 *
 * To run a query within a React component, call `usePlaylistsPublicAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsPublicAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsPublicAvailableQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePlaylistsPublicAvailableQuery(baseOptions: Apollo.QueryHookOptions<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables> & ({ variables: PlaylistsPublicAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>(PlaylistsPublicAvailableDocument, options);
      }
export function usePlaylistsPublicAvailableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>(PlaylistsPublicAvailableDocument, options);
        }
export function usePlaylistsPublicAvailableSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>(PlaylistsPublicAvailableDocument, options);
        }
export type PlaylistsPublicAvailableQueryHookResult = ReturnType<typeof usePlaylistsPublicAvailableQuery>;
export type PlaylistsPublicAvailableLazyQueryHookResult = ReturnType<typeof usePlaylistsPublicAvailableLazyQuery>;
export type PlaylistsPublicAvailableSuspenseQueryHookResult = ReturnType<typeof usePlaylistsPublicAvailableSuspenseQuery>;
export type PlaylistsPublicAvailableQueryResult = Apollo.QueryResult<PlaylistsPublicAvailableQuery, PlaylistsPublicAvailableQueryVariables>;
export const PlaylistCreateDocument = gql`
    mutation playlistCreate($input: CreatePlaylistInput!) {
  playlistCreate(input: $input) {
    ...CorePlaylistFields
  }
}
    ${CorePlaylistFieldsFragmentDoc}`;
export type PlaylistCreateMutationFn = Apollo.MutationFunction<PlaylistCreateMutation, PlaylistCreateMutationVariables>;

/**
 * __usePlaylistCreateMutation__
 *
 * To run a mutation, you first call `usePlaylistCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaylistCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [playlistCreateMutation, { data, loading, error }] = usePlaylistCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePlaylistCreateMutation(baseOptions?: Apollo.MutationHookOptions<PlaylistCreateMutation, PlaylistCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlaylistCreateMutation, PlaylistCreateMutationVariables>(PlaylistCreateDocument, options);
      }
export type PlaylistCreateMutationHookResult = ReturnType<typeof usePlaylistCreateMutation>;
export type PlaylistCreateMutationResult = Apollo.MutationResult<PlaylistCreateMutation>;
export type PlaylistCreateMutationOptions = Apollo.BaseMutationOptions<PlaylistCreateMutation, PlaylistCreateMutationVariables>;
export const PlaylistDeleteByIdDocument = gql`
    mutation playlistDeleteById($_id: ID!) {
  playlistDeleteById(_id: $_id) {
    _id
  }
}
    `;
export type PlaylistDeleteByIdMutationFn = Apollo.MutationFunction<PlaylistDeleteByIdMutation, PlaylistDeleteByIdMutationVariables>;

/**
 * __usePlaylistDeleteByIdMutation__
 *
 * To run a mutation, you first call `usePlaylistDeleteByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaylistDeleteByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [playlistDeleteByIdMutation, { data, loading, error }] = usePlaylistDeleteByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function usePlaylistDeleteByIdMutation(baseOptions?: Apollo.MutationHookOptions<PlaylistDeleteByIdMutation, PlaylistDeleteByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlaylistDeleteByIdMutation, PlaylistDeleteByIdMutationVariables>(PlaylistDeleteByIdDocument, options);
      }
export type PlaylistDeleteByIdMutationHookResult = ReturnType<typeof usePlaylistDeleteByIdMutation>;
export type PlaylistDeleteByIdMutationResult = Apollo.MutationResult<PlaylistDeleteByIdMutation>;
export type PlaylistDeleteByIdMutationOptions = Apollo.BaseMutationOptions<PlaylistDeleteByIdMutation, PlaylistDeleteByIdMutationVariables>;
export const PlaylistSwicthTrackDocument = gql`
    mutation playlistSwicthTrack($input: SwitchTrackInPlaylistInput!) {
  playlistSwicthTrack(input: $input) {
    ...CorePlaylistFields
    owner {
      _id
      nick
      avatar
    }
  }
}
    ${CorePlaylistFieldsFragmentDoc}`;
export type PlaylistSwicthTrackMutationFn = Apollo.MutationFunction<PlaylistSwicthTrackMutation, PlaylistSwicthTrackMutationVariables>;

/**
 * __usePlaylistSwicthTrackMutation__
 *
 * To run a mutation, you first call `usePlaylistSwicthTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlaylistSwicthTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [playlistSwicthTrackMutation, { data, loading, error }] = usePlaylistSwicthTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePlaylistSwicthTrackMutation(baseOptions?: Apollo.MutationHookOptions<PlaylistSwicthTrackMutation, PlaylistSwicthTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlaylistSwicthTrackMutation, PlaylistSwicthTrackMutationVariables>(PlaylistSwicthTrackDocument, options);
      }
export type PlaylistSwicthTrackMutationHookResult = ReturnType<typeof usePlaylistSwicthTrackMutation>;
export type PlaylistSwicthTrackMutationResult = Apollo.MutationResult<PlaylistSwicthTrackMutation>;
export type PlaylistSwicthTrackMutationOptions = Apollo.BaseMutationOptions<PlaylistSwicthTrackMutation, PlaylistSwicthTrackMutationVariables>;
export const PostDocument = gql`
    query post($_id: ID!) {
  post(_id: $_id) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export function usePostSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostSuspenseQueryHookResult = ReturnType<typeof usePostSuspenseQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts($offset: Int!, $limit: Int!) {
  posts(offset: $offset, limit: $limit) {
    posts {
      ...CorePostFields
      owner {
        _id
        avatar
        nick
      }
    }
    count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables> & ({ variables: PostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export function usePostsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsSuspenseQueryHookResult = ReturnType<typeof usePostsSuspenseQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const PostsByOwnerDocument = gql`
    query postsByOwner($owner: ID!, $offset: Int!, $limit: Int!) {
  postsByOwner(owner: $owner, offset: $offset, limit: $limit) {
    posts {
      ...CorePostFields
      owner {
        _id
        avatar
        nick
      }
    }
    count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsByOwnerQuery__
 *
 * To run a query within a React component, call `usePostsByOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByOwnerQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsByOwnerQuery(baseOptions: Apollo.QueryHookOptions<PostsByOwnerQuery, PostsByOwnerQueryVariables> & ({ variables: PostsByOwnerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByOwnerQuery, PostsByOwnerQueryVariables>(PostsByOwnerDocument, options);
      }
export function usePostsByOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByOwnerQuery, PostsByOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByOwnerQuery, PostsByOwnerQueryVariables>(PostsByOwnerDocument, options);
        }
export function usePostsByOwnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsByOwnerQuery, PostsByOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByOwnerQuery, PostsByOwnerQueryVariables>(PostsByOwnerDocument, options);
        }
export type PostsByOwnerQueryHookResult = ReturnType<typeof usePostsByOwnerQuery>;
export type PostsByOwnerLazyQueryHookResult = ReturnType<typeof usePostsByOwnerLazyQuery>;
export type PostsByOwnerSuspenseQueryHookResult = ReturnType<typeof usePostsByOwnerSuspenseQuery>;
export type PostsByOwnerQueryResult = Apollo.QueryResult<PostsByOwnerQuery, PostsByOwnerQueryVariables>;
export const PostsSavedByUserDocument = gql`
    query postsSavedByUser($user: ID!, $offset: Int!, $limit: Int!) {
  postsSavedByUser(user: $user, offset: $offset, limit: $limit) {
    posts {
      ...CorePostFields
      owner {
        _id
        avatar
        nick
      }
    }
    count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsSavedByUserQuery__
 *
 * To run a query within a React component, call `usePostsSavedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsSavedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsSavedByUserQuery({
 *   variables: {
 *      user: // value for 'user'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsSavedByUserQuery(baseOptions: Apollo.QueryHookOptions<PostsSavedByUserQuery, PostsSavedByUserQueryVariables> & ({ variables: PostsSavedByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>(PostsSavedByUserDocument, options);
      }
export function usePostsSavedByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>(PostsSavedByUserDocument, options);
        }
export function usePostsSavedByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>(PostsSavedByUserDocument, options);
        }
export type PostsSavedByUserQueryHookResult = ReturnType<typeof usePostsSavedByUserQuery>;
export type PostsSavedByUserLazyQueryHookResult = ReturnType<typeof usePostsSavedByUserLazyQuery>;
export type PostsSavedByUserSuspenseQueryHookResult = ReturnType<typeof usePostsSavedByUserSuspenseQuery>;
export type PostsSavedByUserQueryResult = Apollo.QueryResult<PostsSavedByUserQuery, PostsSavedByUserQueryVariables>;
export const PostsByTitleDocument = gql`
    query postsByTitle($input: PostsByTitleInput!) {
  postsByTitle(input: $input) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsByTitleQuery__
 *
 * To run a query within a React component, call `usePostsByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByTitleQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostsByTitleQuery(baseOptions: Apollo.QueryHookOptions<PostsByTitleQuery, PostsByTitleQueryVariables> & ({ variables: PostsByTitleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByTitleQuery, PostsByTitleQueryVariables>(PostsByTitleDocument, options);
      }
export function usePostsByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByTitleQuery, PostsByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByTitleQuery, PostsByTitleQueryVariables>(PostsByTitleDocument, options);
        }
export function usePostsByTitleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsByTitleQuery, PostsByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByTitleQuery, PostsByTitleQueryVariables>(PostsByTitleDocument, options);
        }
export type PostsByTitleQueryHookResult = ReturnType<typeof usePostsByTitleQuery>;
export type PostsByTitleLazyQueryHookResult = ReturnType<typeof usePostsByTitleLazyQuery>;
export type PostsByTitleSuspenseQueryHookResult = ReturnType<typeof usePostsByTitleSuspenseQuery>;
export type PostsByTitleQueryResult = Apollo.QueryResult<PostsByTitleQuery, PostsByTitleQueryVariables>;
export const PostsByIdsDocument = gql`
    query postsByIds($ids: [ID!]!) {
  postsByIds(ids: $ids) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsByIdsQuery__
 *
 * To run a query within a React component, call `usePostsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePostsByIdsQuery(baseOptions: Apollo.QueryHookOptions<PostsByIdsQuery, PostsByIdsQueryVariables> & ({ variables: PostsByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByIdsQuery, PostsByIdsQueryVariables>(PostsByIdsDocument, options);
      }
export function usePostsByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByIdsQuery, PostsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByIdsQuery, PostsByIdsQueryVariables>(PostsByIdsDocument, options);
        }
export function usePostsByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsByIdsQuery, PostsByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByIdsQuery, PostsByIdsQueryVariables>(PostsByIdsDocument, options);
        }
export type PostsByIdsQueryHookResult = ReturnType<typeof usePostsByIdsQuery>;
export type PostsByIdsLazyQueryHookResult = ReturnType<typeof usePostsByIdsLazyQuery>;
export type PostsByIdsSuspenseQueryHookResult = ReturnType<typeof usePostsByIdsSuspenseQuery>;
export type PostsByIdsQueryResult = Apollo.QueryResult<PostsByIdsQuery, PostsByIdsQueryVariables>;
export const PostsMostPopularDocument = gql`
    query postsMostPopular($date: Date!) {
  postsMostPopular(date: $date) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsMostPopularQuery__
 *
 * To run a query within a React component, call `usePostsMostPopularQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsMostPopularQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsMostPopularQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function usePostsMostPopularQuery(baseOptions: Apollo.QueryHookOptions<PostsMostPopularQuery, PostsMostPopularQueryVariables> & ({ variables: PostsMostPopularQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsMostPopularQuery, PostsMostPopularQueryVariables>(PostsMostPopularDocument, options);
      }
export function usePostsMostPopularLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsMostPopularQuery, PostsMostPopularQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsMostPopularQuery, PostsMostPopularQueryVariables>(PostsMostPopularDocument, options);
        }
export function usePostsMostPopularSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsMostPopularQuery, PostsMostPopularQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsMostPopularQuery, PostsMostPopularQueryVariables>(PostsMostPopularDocument, options);
        }
export type PostsMostPopularQueryHookResult = ReturnType<typeof usePostsMostPopularQuery>;
export type PostsMostPopularLazyQueryHookResult = ReturnType<typeof usePostsMostPopularLazyQuery>;
export type PostsMostPopularSuspenseQueryHookResult = ReturnType<typeof usePostsMostPopularSuspenseQuery>;
export type PostsMostPopularQueryResult = Apollo.QueryResult<PostsMostPopularQuery, PostsMostPopularQueryVariables>;
export const PostsByCategoryDocument = gql`
    query postsByCategory($category: String!, $offset: Int!, $limit: Int!) {
  postsByCategory(category: $category, offset: $offset, limit: $limit) {
    posts {
      ...CorePostFields
      owner {
        _id
        avatar
        nick
      }
    }
    count
  }
}
    ${CorePostFieldsFragmentDoc}`;

/**
 * __usePostsByCategoryQuery__
 *
 * To run a query within a React component, call `usePostsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<PostsByCategoryQuery, PostsByCategoryQueryVariables> & ({ variables: PostsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByCategoryQuery, PostsByCategoryQueryVariables>(PostsByCategoryDocument, options);
      }
export function usePostsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByCategoryQuery, PostsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByCategoryQuery, PostsByCategoryQueryVariables>(PostsByCategoryDocument, options);
        }
export function usePostsByCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsByCategoryQuery, PostsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByCategoryQuery, PostsByCategoryQueryVariables>(PostsByCategoryDocument, options);
        }
export type PostsByCategoryQueryHookResult = ReturnType<typeof usePostsByCategoryQuery>;
export type PostsByCategoryLazyQueryHookResult = ReturnType<typeof usePostsByCategoryLazyQuery>;
export type PostsByCategorySuspenseQueryHookResult = ReturnType<typeof usePostsByCategorySuspenseQuery>;
export type PostsByCategoryQueryResult = Apollo.QueryResult<PostsByCategoryQuery, PostsByCategoryQueryVariables>;
export const PostsByCategoryCountDocument = gql`
    query postsByCategoryCount {
  postsByCategoryCount {
    country
    pop
    classical
    funk
    soul
    hipHop
    rock
    electronic
    latin
    jazz
    blues
    folk
    metal
    reggae
  }
}
    `;

/**
 * __usePostsByCategoryCountQuery__
 *
 * To run a query within a React component, call `usePostsByCategoryCountQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsByCategoryCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsByCategoryCountQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsByCategoryCountQuery(baseOptions?: Apollo.QueryHookOptions<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>(PostsByCategoryCountDocument, options);
      }
export function usePostsByCategoryCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>(PostsByCategoryCountDocument, options);
        }
export function usePostsByCategoryCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>(PostsByCategoryCountDocument, options);
        }
export type PostsByCategoryCountQueryHookResult = ReturnType<typeof usePostsByCategoryCountQuery>;
export type PostsByCategoryCountLazyQueryHookResult = ReturnType<typeof usePostsByCategoryCountLazyQuery>;
export type PostsByCategoryCountSuspenseQueryHookResult = ReturnType<typeof usePostsByCategoryCountSuspenseQuery>;
export type PostsByCategoryCountQueryResult = Apollo.QueryResult<PostsByCategoryCountQuery, PostsByCategoryCountQueryVariables>;
export const PostCreateDocument = gql`
    mutation postCreate($input: AddPostInput!) {
  postCreate(input: $input) {
    ...CorePostFields
  }
}
    ${CorePostFieldsFragmentDoc}`;
export type PostCreateMutationFn = Apollo.MutationFunction<PostCreateMutation, PostCreateMutationVariables>;

/**
 * __usePostCreateMutation__
 *
 * To run a mutation, you first call `usePostCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCreateMutation, { data, loading, error }] = usePostCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostCreateMutation(baseOptions?: Apollo.MutationHookOptions<PostCreateMutation, PostCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostCreateMutation, PostCreateMutationVariables>(PostCreateDocument, options);
      }
export type PostCreateMutationHookResult = ReturnType<typeof usePostCreateMutation>;
export type PostCreateMutationResult = Apollo.MutationResult<PostCreateMutation>;
export type PostCreateMutationOptions = Apollo.BaseMutationOptions<PostCreateMutation, PostCreateMutationVariables>;
export const PostDeleteByIdDocument = gql`
    mutation postDeleteById($_id: ID!) {
  postDeleteById(_id: $_id) {
    _id
    title
  }
}
    `;
export type PostDeleteByIdMutationFn = Apollo.MutationFunction<PostDeleteByIdMutation, PostDeleteByIdMutationVariables>;

/**
 * __usePostDeleteByIdMutation__
 *
 * To run a mutation, you first call `usePostDeleteByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostDeleteByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postDeleteByIdMutation, { data, loading, error }] = usePostDeleteByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function usePostDeleteByIdMutation(baseOptions?: Apollo.MutationHookOptions<PostDeleteByIdMutation, PostDeleteByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostDeleteByIdMutation, PostDeleteByIdMutationVariables>(PostDeleteByIdDocument, options);
      }
export type PostDeleteByIdMutationHookResult = ReturnType<typeof usePostDeleteByIdMutation>;
export type PostDeleteByIdMutationResult = Apollo.MutationResult<PostDeleteByIdMutation>;
export type PostDeleteByIdMutationOptions = Apollo.BaseMutationOptions<PostDeleteByIdMutation, PostDeleteByIdMutationVariables>;
export const PostSwitchLikeDocument = gql`
    mutation postSwitchLike($input: SwitchLikeOrPostInSavedInput!) {
  postSwitchLike(input: $input) {
    ...CorePostFields
  }
}
    ${CorePostFieldsFragmentDoc}`;
export type PostSwitchLikeMutationFn = Apollo.MutationFunction<PostSwitchLikeMutation, PostSwitchLikeMutationVariables>;

/**
 * __usePostSwitchLikeMutation__
 *
 * To run a mutation, you first call `usePostSwitchLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostSwitchLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postSwitchLikeMutation, { data, loading, error }] = usePostSwitchLikeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostSwitchLikeMutation(baseOptions?: Apollo.MutationHookOptions<PostSwitchLikeMutation, PostSwitchLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostSwitchLikeMutation, PostSwitchLikeMutationVariables>(PostSwitchLikeDocument, options);
      }
export type PostSwitchLikeMutationHookResult = ReturnType<typeof usePostSwitchLikeMutation>;
export type PostSwitchLikeMutationResult = Apollo.MutationResult<PostSwitchLikeMutation>;
export type PostSwitchLikeMutationOptions = Apollo.BaseMutationOptions<PostSwitchLikeMutation, PostSwitchLikeMutationVariables>;
export const PostSwicthInSavedDocument = gql`
    mutation postSwicthInSaved($input: SwitchLikeOrPostInSavedInput!) {
  postSwicthInSaved(input: $input) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;
export type PostSwicthInSavedMutationFn = Apollo.MutationFunction<PostSwicthInSavedMutation, PostSwicthInSavedMutationVariables>;

/**
 * __usePostSwicthInSavedMutation__
 *
 * To run a mutation, you first call `usePostSwicthInSavedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostSwicthInSavedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postSwicthInSavedMutation, { data, loading, error }] = usePostSwicthInSavedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostSwicthInSavedMutation(baseOptions?: Apollo.MutationHookOptions<PostSwicthInSavedMutation, PostSwicthInSavedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostSwicthInSavedMutation, PostSwicthInSavedMutationVariables>(PostSwicthInSavedDocument, options);
      }
export type PostSwicthInSavedMutationHookResult = ReturnType<typeof usePostSwicthInSavedMutation>;
export type PostSwicthInSavedMutationResult = Apollo.MutationResult<PostSwicthInSavedMutation>;
export type PostSwicthInSavedMutationOptions = Apollo.BaseMutationOptions<PostSwicthInSavedMutation, PostSwicthInSavedMutationVariables>;
export const PostUpdateDocument = gql`
    mutation postUpdate($input: UpdatePostInput!) {
  postUpdate(input: $input) {
    ...CorePostFields
    owner {
      _id
      avatar
      nick
    }
  }
}
    ${CorePostFieldsFragmentDoc}`;
export type PostUpdateMutationFn = Apollo.MutationFunction<PostUpdateMutation, PostUpdateMutationVariables>;

/**
 * __usePostUpdateMutation__
 *
 * To run a mutation, you first call `usePostUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postUpdateMutation, { data, loading, error }] = usePostUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PostUpdateMutation, PostUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostUpdateMutation, PostUpdateMutationVariables>(PostUpdateDocument, options);
      }
export type PostUpdateMutationHookResult = ReturnType<typeof usePostUpdateMutation>;
export type PostUpdateMutationResult = Apollo.MutationResult<PostUpdateMutation>;
export type PostUpdateMutationOptions = Apollo.BaseMutationOptions<PostUpdateMutation, PostUpdateMutationVariables>;
export const ReportCreateDocument = gql`
    mutation reportCreate($input: CreateReportInput!) {
  reportCreate(input: $input) {
    _id
  }
}
    `;
export type ReportCreateMutationFn = Apollo.MutationFunction<ReportCreateMutation, ReportCreateMutationVariables>;

/**
 * __useReportCreateMutation__
 *
 * To run a mutation, you first call `useReportCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportCreateMutation, { data, loading, error }] = useReportCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportCreateMutation(baseOptions?: Apollo.MutationHookOptions<ReportCreateMutation, ReportCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportCreateMutation, ReportCreateMutationVariables>(ReportCreateDocument, options);
      }
export type ReportCreateMutationHookResult = ReturnType<typeof useReportCreateMutation>;
export type ReportCreateMutationResult = Apollo.MutationResult<ReportCreateMutation>;
export type ReportCreateMutationOptions = Apollo.BaseMutationOptions<ReportCreateMutation, ReportCreateMutationVariables>;
export const SupportRequestCreateDocument = gql`
    mutation supportRequestCreate($input: CreateSupportRequestInput!) {
  supportRequestCreate(input: $input) {
    _id
  }
}
    `;
export type SupportRequestCreateMutationFn = Apollo.MutationFunction<SupportRequestCreateMutation, SupportRequestCreateMutationVariables>;

/**
 * __useSupportRequestCreateMutation__
 *
 * To run a mutation, you first call `useSupportRequestCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSupportRequestCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [supportRequestCreateMutation, { data, loading, error }] = useSupportRequestCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSupportRequestCreateMutation(baseOptions?: Apollo.MutationHookOptions<SupportRequestCreateMutation, SupportRequestCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SupportRequestCreateMutation, SupportRequestCreateMutationVariables>(SupportRequestCreateDocument, options);
      }
export type SupportRequestCreateMutationHookResult = ReturnType<typeof useSupportRequestCreateMutation>;
export type SupportRequestCreateMutationResult = Apollo.MutationResult<SupportRequestCreateMutation>;
export type SupportRequestCreateMutationOptions = Apollo.BaseMutationOptions<SupportRequestCreateMutation, SupportRequestCreateMutationVariables>;
export const SupportRequestCloseDocument = gql`
    mutation supportRequestClose($_id: ID!) {
  supportRequestClose(_id: $_id) {
    _id
  }
}
    `;
export type SupportRequestCloseMutationFn = Apollo.MutationFunction<SupportRequestCloseMutation, SupportRequestCloseMutationVariables>;

/**
 * __useSupportRequestCloseMutation__
 *
 * To run a mutation, you first call `useSupportRequestCloseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSupportRequestCloseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [supportRequestCloseMutation, { data, loading, error }] = useSupportRequestCloseMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useSupportRequestCloseMutation(baseOptions?: Apollo.MutationHookOptions<SupportRequestCloseMutation, SupportRequestCloseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SupportRequestCloseMutation, SupportRequestCloseMutationVariables>(SupportRequestCloseDocument, options);
      }
export type SupportRequestCloseMutationHookResult = ReturnType<typeof useSupportRequestCloseMutation>;
export type SupportRequestCloseMutationResult = Apollo.MutationResult<SupportRequestCloseMutation>;
export type SupportRequestCloseMutationOptions = Apollo.BaseMutationOptions<SupportRequestCloseMutation, SupportRequestCloseMutationVariables>;
export const UserDocument = gql`
    query user($_id: ID!) {
  user(_id: $_id) {
    ...CoreUserFields
    local {
      email
    }
    google {
      email
    }
    facebook {
      name
    }
    twitter {
      name
    }
    subscribedOn {
      _id
    }
    subscribers {
      _id
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersByNicknameDocument = gql`
    query usersByNickname($nick: String!) {
  usersByNickname(nick: $nick) {
    ...CoreUserFields
    subscribedOn {
      _id
    }
    subscribers {
      _id
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;

/**
 * __useUsersByNicknameQuery__
 *
 * To run a query within a React component, call `useUsersByNicknameQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByNicknameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByNicknameQuery({
 *   variables: {
 *      nick: // value for 'nick'
 *   },
 * });
 */
export function useUsersByNicknameQuery(baseOptions: Apollo.QueryHookOptions<UsersByNicknameQuery, UsersByNicknameQueryVariables> & ({ variables: UsersByNicknameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByNicknameQuery, UsersByNicknameQueryVariables>(UsersByNicknameDocument, options);
      }
export function useUsersByNicknameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByNicknameQuery, UsersByNicknameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByNicknameQuery, UsersByNicknameQueryVariables>(UsersByNicknameDocument, options);
        }
export function useUsersByNicknameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersByNicknameQuery, UsersByNicknameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersByNicknameQuery, UsersByNicknameQueryVariables>(UsersByNicknameDocument, options);
        }
export type UsersByNicknameQueryHookResult = ReturnType<typeof useUsersByNicknameQuery>;
export type UsersByNicknameLazyQueryHookResult = ReturnType<typeof useUsersByNicknameLazyQuery>;
export type UsersByNicknameSuspenseQueryHookResult = ReturnType<typeof useUsersByNicknameSuspenseQuery>;
export type UsersByNicknameQueryResult = Apollo.QueryResult<UsersByNicknameQuery, UsersByNicknameQueryVariables>;
export const UsersByIdsDocument = gql`
    query usersByIds($ids: [ID!]!) {
  usersByIds(ids: $ids) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;

/**
 * __useUsersByIdsQuery__
 *
 * To run a query within a React component, call `useUsersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useUsersByIdsQuery(baseOptions: Apollo.QueryHookOptions<UsersByIdsQuery, UsersByIdsQueryVariables> & ({ variables: UsersByIdsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(UsersByIdsDocument, options);
      }
export function useUsersByIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByIdsQuery, UsersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(UsersByIdsDocument, options);
        }
export function useUsersByIdsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UsersByIdsQuery, UsersByIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(UsersByIdsDocument, options);
        }
export type UsersByIdsQueryHookResult = ReturnType<typeof useUsersByIdsQuery>;
export type UsersByIdsLazyQueryHookResult = ReturnType<typeof useUsersByIdsLazyQuery>;
export type UsersByIdsSuspenseQueryHookResult = ReturnType<typeof useUsersByIdsSuspenseQuery>;
export type UsersByIdsQueryResult = Apollo.QueryResult<UsersByIdsQuery, UsersByIdsQueryVariables>;
export const UserAchievementsDataDocument = gql`
    query userAchievementsData($_id: ID!) {
  userAchievementsData(_id: $_id) {
    achievements
    totalLikes
    totalSaves
    maxLikesByPost
    maxSavesByPost
    postCount
    maxLikesPostId
    maxSavesPostId
  }
}
    `;

/**
 * __useUserAchievementsDataQuery__
 *
 * To run a query within a React component, call `useUserAchievementsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAchievementsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAchievementsDataQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserAchievementsDataQuery(baseOptions: Apollo.QueryHookOptions<UserAchievementsDataQuery, UserAchievementsDataQueryVariables> & ({ variables: UserAchievementsDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>(UserAchievementsDataDocument, options);
      }
export function useUserAchievementsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>(UserAchievementsDataDocument, options);
        }
export function useUserAchievementsDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>(UserAchievementsDataDocument, options);
        }
export type UserAchievementsDataQueryHookResult = ReturnType<typeof useUserAchievementsDataQuery>;
export type UserAchievementsDataLazyQueryHookResult = ReturnType<typeof useUserAchievementsDataLazyQuery>;
export type UserAchievementsDataSuspenseQueryHookResult = ReturnType<typeof useUserAchievementsDataSuspenseQuery>;
export type UserAchievementsDataQueryResult = Apollo.QueryResult<UserAchievementsDataQuery, UserAchievementsDataQueryVariables>;
export const UserCreateDocument = gql`
    mutation userCreate($input: AddUserInput!) {
  userCreate(input: $input) {
    user {
      ...CoreUserFields
    }
    action {
      _id
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserCreateMutationFn = Apollo.MutationFunction<UserCreateMutation, UserCreateMutationVariables>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(baseOptions?: Apollo.MutationHookOptions<UserCreateMutation, UserCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
      }
export type UserCreateMutationHookResult = ReturnType<typeof useUserCreateMutation>;
export type UserCreateMutationResult = Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<UserCreateMutation, UserCreateMutationVariables>;
export const UserDeleteByIdDocument = gql`
    mutation userDeleteById($_id: ID!) {
  userDeleteById(_id: $_id) {
    _id
  }
}
    `;
export type UserDeleteByIdMutationFn = Apollo.MutationFunction<UserDeleteByIdMutation, UserDeleteByIdMutationVariables>;

/**
 * __useUserDeleteByIdMutation__
 *
 * To run a mutation, you first call `useUserDeleteByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userDeleteByIdMutation, { data, loading, error }] = useUserDeleteByIdMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserDeleteByIdMutation(baseOptions?: Apollo.MutationHookOptions<UserDeleteByIdMutation, UserDeleteByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserDeleteByIdMutation, UserDeleteByIdMutationVariables>(UserDeleteByIdDocument, options);
      }
export type UserDeleteByIdMutationHookResult = ReturnType<typeof useUserDeleteByIdMutation>;
export type UserDeleteByIdMutationResult = Apollo.MutationResult<UserDeleteByIdMutation>;
export type UserDeleteByIdMutationOptions = Apollo.BaseMutationOptions<UserDeleteByIdMutation, UserDeleteByIdMutationVariables>;
export const UserSwitchSubscriptionDocument = gql`
    mutation userSwitchSubscription($input: SwitchSubscriptionOnUserInput!) {
  userSwitchSubscription(input: $input) {
    subscriber {
      ...CoreUserFields
      subscribedOn {
        _id
      }
      subscribers {
        _id
      }
    }
    subscribeOn {
      ...CoreUserFields
      subscribedOn {
        _id
      }
      subscribers {
        _id
      }
    }
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserSwitchSubscriptionMutationFn = Apollo.MutationFunction<UserSwitchSubscriptionMutation, UserSwitchSubscriptionMutationVariables>;

/**
 * __useUserSwitchSubscriptionMutation__
 *
 * To run a mutation, you first call `useUserSwitchSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserSwitchSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userSwitchSubscriptionMutation, { data, loading, error }] = useUserSwitchSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserSwitchSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UserSwitchSubscriptionMutation, UserSwitchSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserSwitchSubscriptionMutation, UserSwitchSubscriptionMutationVariables>(UserSwitchSubscriptionDocument, options);
      }
export type UserSwitchSubscriptionMutationHookResult = ReturnType<typeof useUserSwitchSubscriptionMutation>;
export type UserSwitchSubscriptionMutationResult = Apollo.MutationResult<UserSwitchSubscriptionMutation>;
export type UserSwitchSubscriptionMutationOptions = Apollo.BaseMutationOptions<UserSwitchSubscriptionMutation, UserSwitchSubscriptionMutationVariables>;
export const UserUpdateDocument = gql`
    mutation userUpdate($input: UpdateUserInput!) {
  userUpdate(input: $input) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserUpdateMutationFn = Apollo.MutationFunction<UserUpdateMutation, UserUpdateMutationVariables>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateMutation, UserUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(UserUpdateDocument, options);
      }
export type UserUpdateMutationHookResult = ReturnType<typeof useUserUpdateMutation>;
export type UserUpdateMutationResult = Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables>;
export const UserPrepareAccountToRestoreDocument = gql`
    mutation userPrepareAccountToRestore($input: PrepareAccountToRestoreInput!) {
  userPrepareAccountToRestore(input: $input) {
    user {
      _id
    }
    action {
      _id
    }
  }
}
    `;
export type UserPrepareAccountToRestoreMutationFn = Apollo.MutationFunction<UserPrepareAccountToRestoreMutation, UserPrepareAccountToRestoreMutationVariables>;

/**
 * __useUserPrepareAccountToRestoreMutation__
 *
 * To run a mutation, you first call `useUserPrepareAccountToRestoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserPrepareAccountToRestoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userPrepareAccountToRestoreMutation, { data, loading, error }] = useUserPrepareAccountToRestoreMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserPrepareAccountToRestoreMutation(baseOptions?: Apollo.MutationHookOptions<UserPrepareAccountToRestoreMutation, UserPrepareAccountToRestoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserPrepareAccountToRestoreMutation, UserPrepareAccountToRestoreMutationVariables>(UserPrepareAccountToRestoreDocument, options);
      }
export type UserPrepareAccountToRestoreMutationHookResult = ReturnType<typeof useUserPrepareAccountToRestoreMutation>;
export type UserPrepareAccountToRestoreMutationResult = Apollo.MutationResult<UserPrepareAccountToRestoreMutation>;
export type UserPrepareAccountToRestoreMutationOptions = Apollo.BaseMutationOptions<UserPrepareAccountToRestoreMutation, UserPrepareAccountToRestoreMutationVariables>;
export const UserConfirmAccountDocument = gql`
    mutation userConfirmAccount($input: AccountConfirmInput!) {
  userConfirmAccount(input: $input) {
    user {
      _id
    }
    action {
      _id
    }
  }
}
    `;
export type UserConfirmAccountMutationFn = Apollo.MutationFunction<UserConfirmAccountMutation, UserConfirmAccountMutationVariables>;

/**
 * __useUserConfirmAccountMutation__
 *
 * To run a mutation, you first call `useUserConfirmAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserConfirmAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userConfirmAccountMutation, { data, loading, error }] = useUserConfirmAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserConfirmAccountMutation(baseOptions?: Apollo.MutationHookOptions<UserConfirmAccountMutation, UserConfirmAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserConfirmAccountMutation, UserConfirmAccountMutationVariables>(UserConfirmAccountDocument, options);
      }
export type UserConfirmAccountMutationHookResult = ReturnType<typeof useUserConfirmAccountMutation>;
export type UserConfirmAccountMutationResult = Apollo.MutationResult<UserConfirmAccountMutation>;
export type UserConfirmAccountMutationOptions = Apollo.BaseMutationOptions<UserConfirmAccountMutation, UserConfirmAccountMutationVariables>;
export const UserRestoreAccountDocument = gql`
    mutation userRestoreAccount($input: AccountRestoreInput!) {
  userRestoreAccount(input: $input) {
    user {
      _id
    }
    action {
      _id
    }
  }
}
    `;
export type UserRestoreAccountMutationFn = Apollo.MutationFunction<UserRestoreAccountMutation, UserRestoreAccountMutationVariables>;

/**
 * __useUserRestoreAccountMutation__
 *
 * To run a mutation, you first call `useUserRestoreAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRestoreAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRestoreAccountMutation, { data, loading, error }] = useUserRestoreAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserRestoreAccountMutation(baseOptions?: Apollo.MutationHookOptions<UserRestoreAccountMutation, UserRestoreAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRestoreAccountMutation, UserRestoreAccountMutationVariables>(UserRestoreAccountDocument, options);
      }
export type UserRestoreAccountMutationHookResult = ReturnType<typeof useUserRestoreAccountMutation>;
export type UserRestoreAccountMutationResult = Apollo.MutationResult<UserRestoreAccountMutation>;
export type UserRestoreAccountMutationOptions = Apollo.BaseMutationOptions<UserRestoreAccountMutation, UserRestoreAccountMutationVariables>;
export const UserLinkGoogleDocument = gql`
    mutation userLinkGoogle($input: LinkGoogleInput!) {
  userLinkGoogle(input: $input) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserLinkGoogleMutationFn = Apollo.MutationFunction<UserLinkGoogleMutation, UserLinkGoogleMutationVariables>;

/**
 * __useUserLinkGoogleMutation__
 *
 * To run a mutation, you first call `useUserLinkGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLinkGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLinkGoogleMutation, { data, loading, error }] = useUserLinkGoogleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLinkGoogleMutation(baseOptions?: Apollo.MutationHookOptions<UserLinkGoogleMutation, UserLinkGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLinkGoogleMutation, UserLinkGoogleMutationVariables>(UserLinkGoogleDocument, options);
      }
export type UserLinkGoogleMutationHookResult = ReturnType<typeof useUserLinkGoogleMutation>;
export type UserLinkGoogleMutationResult = Apollo.MutationResult<UserLinkGoogleMutation>;
export type UserLinkGoogleMutationOptions = Apollo.BaseMutationOptions<UserLinkGoogleMutation, UserLinkGoogleMutationVariables>;
export const UserUnlinkGoogleDocument = gql`
    mutation userUnlinkGoogle($_id: ID!) {
  userUnlinkGoogle(_id: $_id) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserUnlinkGoogleMutationFn = Apollo.MutationFunction<UserUnlinkGoogleMutation, UserUnlinkGoogleMutationVariables>;

/**
 * __useUserUnlinkGoogleMutation__
 *
 * To run a mutation, you first call `useUserUnlinkGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUnlinkGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUnlinkGoogleMutation, { data, loading, error }] = useUserUnlinkGoogleMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserUnlinkGoogleMutation(baseOptions?: Apollo.MutationHookOptions<UserUnlinkGoogleMutation, UserUnlinkGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUnlinkGoogleMutation, UserUnlinkGoogleMutationVariables>(UserUnlinkGoogleDocument, options);
      }
export type UserUnlinkGoogleMutationHookResult = ReturnType<typeof useUserUnlinkGoogleMutation>;
export type UserUnlinkGoogleMutationResult = Apollo.MutationResult<UserUnlinkGoogleMutation>;
export type UserUnlinkGoogleMutationOptions = Apollo.BaseMutationOptions<UserUnlinkGoogleMutation, UserUnlinkGoogleMutationVariables>;
export const UserLinkFacebookDocument = gql`
    mutation userLinkFacebook($input: LinkTwitterOrFacebookInput!) {
  userLinkFacebook(input: $input) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserLinkFacebookMutationFn = Apollo.MutationFunction<UserLinkFacebookMutation, UserLinkFacebookMutationVariables>;

/**
 * __useUserLinkFacebookMutation__
 *
 * To run a mutation, you first call `useUserLinkFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLinkFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLinkFacebookMutation, { data, loading, error }] = useUserLinkFacebookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLinkFacebookMutation(baseOptions?: Apollo.MutationHookOptions<UserLinkFacebookMutation, UserLinkFacebookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLinkFacebookMutation, UserLinkFacebookMutationVariables>(UserLinkFacebookDocument, options);
      }
export type UserLinkFacebookMutationHookResult = ReturnType<typeof useUserLinkFacebookMutation>;
export type UserLinkFacebookMutationResult = Apollo.MutationResult<UserLinkFacebookMutation>;
export type UserLinkFacebookMutationOptions = Apollo.BaseMutationOptions<UserLinkFacebookMutation, UserLinkFacebookMutationVariables>;
export const UserUnlinkFacebookDocument = gql`
    mutation userUnlinkFacebook($_id: ID!) {
  userUnlinkFacebook(_id: $_id) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserUnlinkFacebookMutationFn = Apollo.MutationFunction<UserUnlinkFacebookMutation, UserUnlinkFacebookMutationVariables>;

/**
 * __useUserUnlinkFacebookMutation__
 *
 * To run a mutation, you first call `useUserUnlinkFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUnlinkFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUnlinkFacebookMutation, { data, loading, error }] = useUserUnlinkFacebookMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserUnlinkFacebookMutation(baseOptions?: Apollo.MutationHookOptions<UserUnlinkFacebookMutation, UserUnlinkFacebookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUnlinkFacebookMutation, UserUnlinkFacebookMutationVariables>(UserUnlinkFacebookDocument, options);
      }
export type UserUnlinkFacebookMutationHookResult = ReturnType<typeof useUserUnlinkFacebookMutation>;
export type UserUnlinkFacebookMutationResult = Apollo.MutationResult<UserUnlinkFacebookMutation>;
export type UserUnlinkFacebookMutationOptions = Apollo.BaseMutationOptions<UserUnlinkFacebookMutation, UserUnlinkFacebookMutationVariables>;
export const UserLinkTwitterDocument = gql`
    mutation userLinkTwitter($input: LinkTwitterOrFacebookInput!) {
  userLinkTwitter(input: $input) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserLinkTwitterMutationFn = Apollo.MutationFunction<UserLinkTwitterMutation, UserLinkTwitterMutationVariables>;

/**
 * __useUserLinkTwitterMutation__
 *
 * To run a mutation, you first call `useUserLinkTwitterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLinkTwitterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLinkTwitterMutation, { data, loading, error }] = useUserLinkTwitterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserLinkTwitterMutation(baseOptions?: Apollo.MutationHookOptions<UserLinkTwitterMutation, UserLinkTwitterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLinkTwitterMutation, UserLinkTwitterMutationVariables>(UserLinkTwitterDocument, options);
      }
export type UserLinkTwitterMutationHookResult = ReturnType<typeof useUserLinkTwitterMutation>;
export type UserLinkTwitterMutationResult = Apollo.MutationResult<UserLinkTwitterMutation>;
export type UserLinkTwitterMutationOptions = Apollo.BaseMutationOptions<UserLinkTwitterMutation, UserLinkTwitterMutationVariables>;
export const UserUnlinkTwitterDocument = gql`
    mutation userUnlinkTwitter($_id: ID!) {
  userUnlinkTwitter(_id: $_id) {
    ...CoreUserFields
  }
}
    ${CoreUserFieldsFragmentDoc}`;
export type UserUnlinkTwitterMutationFn = Apollo.MutationFunction<UserUnlinkTwitterMutation, UserUnlinkTwitterMutationVariables>;

/**
 * __useUserUnlinkTwitterMutation__
 *
 * To run a mutation, you first call `useUserUnlinkTwitterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUnlinkTwitterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUnlinkTwitterMutation, { data, loading, error }] = useUserUnlinkTwitterMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUserUnlinkTwitterMutation(baseOptions?: Apollo.MutationHookOptions<UserUnlinkTwitterMutation, UserUnlinkTwitterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUnlinkTwitterMutation, UserUnlinkTwitterMutationVariables>(UserUnlinkTwitterDocument, options);
      }
export type UserUnlinkTwitterMutationHookResult = ReturnType<typeof useUserUnlinkTwitterMutation>;
export type UserUnlinkTwitterMutationResult = Apollo.MutationResult<UserUnlinkTwitterMutation>;
export type UserUnlinkTwitterMutationOptions = Apollo.BaseMutationOptions<UserUnlinkTwitterMutation, UserUnlinkTwitterMutationVariables>;