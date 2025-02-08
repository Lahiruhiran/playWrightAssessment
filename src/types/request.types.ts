export interface CreateObjectRequest {
  name: string;
  data: {
    color: string;
    capacity: string;
    price: number;
    generation: string;
    year: number;
  };
}

export interface UpdateObjectRequest extends CreateObjectRequest {
  id: string;
}