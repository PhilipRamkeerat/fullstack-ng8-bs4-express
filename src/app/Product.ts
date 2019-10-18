export default class Product {
  '_id'?: string; // _id mongo objectId to remove lint erros
  productName: string;
  productDescription: string;
  productPrice: number;
}
