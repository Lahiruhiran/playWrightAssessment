export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface ObjectResponse {
  id: string;
  name: string;
  data: {
    color: string;
    capacity: string;
    price: number;
    generation: string;
    year: number;
  };
}

export type ObjectListResponse = ObjectResponse[];