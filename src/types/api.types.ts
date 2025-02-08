export interface ObjectData {
  id?: string;
  name: string;
  data: {
    color: string;
    capacity: string;
    price: number;
    generation: string;
    year: number;
  };
}