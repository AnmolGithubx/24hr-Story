export interface Story {
  id: string;
  imageUrl: string;
  timestamp: number;
  viewed: boolean;
}

export interface TouchPosition {
  x: number;
  y: number;
}