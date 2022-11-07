export type Product = {
  productName: string;
  productDescription?: string;
  productPrice: number;
  isProductActive: boolean;
  productImages: string[];
};

export interface FirestoreProduct extends Product {
  id: string;
}
