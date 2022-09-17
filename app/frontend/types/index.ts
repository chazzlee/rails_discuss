export type User = {
  username: string;
  email: string;
};

export type Channel = {
  id: number;
  name: string;
  slug: string;
};

export type Discussion = {
  id: number;
  title?: string;
  body?: string;
  truncatedTitle?: string;
  truncatedBody?: string;
  slug: string;
  createdAt: string;
  views: number;
  channel: Channel;
  user: User;
  link: string;
  replyLink: string;
  replies: Reply[];
};

export type Reply = {
  id: number;
  body: string;
  user: User;
  createdAt: string;
  parent_id: number;
  replies: Reply[];
};
