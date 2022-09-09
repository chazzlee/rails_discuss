export type User = {
  id: number;
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
  title: string;
  body: string;
  slug: string;
  created_at: string;
  views: number;
  channel: Channel;
  user: User;
  show_path: string;
};

export type Reply = {
  id: number;
  body: string;
  user: string;
  created_at: string;
  parent_id: number;
  replies: Reply[];
};
