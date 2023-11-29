export interface Restaurant {
  name: string;
  address: {
    building: string;
    street: string;
    city: string;
    zipcode: string;
    coord: number[];
  };
}
