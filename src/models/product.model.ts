export type Product = {
  productName: string;
  productDescription?: string;
  productPrice: number;
  isProductActive: boolean;
};

export interface FirestoreProduct extends Product {
  id: string;
}
