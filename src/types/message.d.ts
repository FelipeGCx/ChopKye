export type Message = {
  tags: Tags;
  message: string;
};
export type Tags = {
  badgeInfo: null;
  badgeInfoRaw: null;
  badges: Badges;
  badgesRaw: string;
  clientNonce: string;
  color: string;
  displayName: string;
  emotes: null;
  emotesRaw: null;
  firstMsg: boolean;
  flags: null;
  id: string;
  messageType: string;
  mod: boolean;
  returningChatter: boolean;
  roomId: string;
  subscriber: boolean;
  tmiSentTs: string;
  turbo: boolean;
  userId: string;
  userType: null;
  username: string;
};

export type Badges = {
  broadcaster? = "1";
  glhfPledge? = "1";
  moderator? = "1";
  partner? = "1";
};
