export interface ProductI {
  details?: string;
  image?: any;
  name: string;
  price: number;
  slug: {
    current: string;
    _type: string;
  };
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}

export interface ProductWithQuantityI {
  details?: string;
  image?: any;
  name: string;
  price: number;
  quantity: number;
  slug: {
    current: string;
    _type: string;
  };
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
}
