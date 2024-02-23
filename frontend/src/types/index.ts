export interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export type GuestType = keyof Guests;

export interface IGlobalSearch {
  location: string;
  checkin: string;
  checkout: string;
  guests: Guests;
  page: number;
}

interface Price {
  rate: number;
  total: number;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  images: string[];
  price: Price;
  rating: number;
  reviewsCount: number;
  previewAmenities: string[];
  bathrooms: number;
  bedrooms: number;
  beds: number;
  persons: number;
}
