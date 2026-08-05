export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;

  address?: {
    city?: string;
    state?: string;
    pincode?: string;
  };
}