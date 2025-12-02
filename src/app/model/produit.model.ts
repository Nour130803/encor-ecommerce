export interface Produit {
  id: number;
  nom: string;
  description: string;
  categorie: string;
  prix: number;
  stock: number;
  imageUrl: string;
  typeProduit?: {
    idType: number;
    nomType: string;
  };
}
