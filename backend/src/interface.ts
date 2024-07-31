/**
 * @description User-Service parameters
 */

export interface IUserBasicInfo {
  username: string;
  avatar: string;
}

export interface IUser {
  basic: IUserBasicInfo;
  ints: number[];
  likes: number[];
}

export interface ILoginInfo {
  username: string;
  password: string;
}

export interface IPost {
  uid: number;
  iid: number;
  content: string;
  quote: number;
  imgs: string[];
  date: string;
  likes: number;
  comments: number[];
}

export interface IInterest {
  icon: string;
  name: string;
  people: number;
  points: number;
}

export interface IComment {
  uid: number;
  content: string;
  date: string;
}
