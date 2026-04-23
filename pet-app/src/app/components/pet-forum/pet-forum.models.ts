// models/pet-forum.models.ts

export interface User {
  id: number;
  username: string;
  displayName: string;
  avatar: string;
  location: string;
}

export interface PetPost {
  id?: number;
  userId: number;
  username: string;
  displayName: string;
  avatar: string;
  petName: string;
  description: string;
  image: string;
  location: string;
  likes: number;
  commentCount: number;
  createdAt: string;
}

export interface HelpPost {
  id?: number;
  userId: number;
  username: string;
  displayName: string;
  avatar: string;
  title: string;
  description: string;
  image: string | null;
  location: string;
  answerCount: number;
  createdAt: string;
}
