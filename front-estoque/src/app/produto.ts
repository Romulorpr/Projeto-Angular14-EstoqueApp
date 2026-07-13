export type CategoriaProduto = 'Alimentos' | 'Bebidas' | 'Doces' | 'Castanhas' | 'Mel' | 'Artesanato' | 'Outros';

export class Produto {
  _id: string;
  codigo: string;
  nome: string;
  quantidade: number;
  categoria: CategoriaProduto;

  constructor(_id: string = "", codigo: string = "", nome: string = "",
              quantidade: number = 0, categoria: CategoriaProduto = "Outros") {
    this._id = _id;
    this.codigo = codigo;
    this.nome = nome;
    this.quantidade = quantidade;
    this.categoria = categoria;
  }
}