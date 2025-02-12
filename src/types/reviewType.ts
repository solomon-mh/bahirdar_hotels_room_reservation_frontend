import { IUser } from "./userTypes";

export interface IReview {
  user?: string;
  hotel?: string;
  rooom?: string;
  rating: number;
  comment: string;
}

export interface IReviewResponse {
  _id: string;
  user: IUser;
  hotel: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
