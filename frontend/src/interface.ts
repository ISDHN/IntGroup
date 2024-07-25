/**
 * @description User-Service parameters
 */

export interface IUserInfo {
  name: string;
  avatar: string;
}

export interface IPost {
  uid: number;
  iid: number;
  content: string;
  imgs: string[];
  date: string;
  likes: number;
  comments: number[];
}

export interface IInterest {
  name: string,
  icon: string,
  points: number,
}

export interface IComment {
  uid: number;
  content: string;
  date: string;
}