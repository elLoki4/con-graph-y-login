export interface product {
  id?: string;
  stock: number;
  ventas: number;
  fecha: number;
  producto: string;
}
export interface productUpdate {
  id?: string;
  stock?: number;
  ventas?: number;
  fecha?: number;
  producto?: string;
}
