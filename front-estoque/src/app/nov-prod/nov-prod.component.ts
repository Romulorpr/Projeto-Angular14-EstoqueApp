import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, CategoriaProduto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-nov-prod',
  templateUrl: './nov-prod.component.html',
  styleUrls: ['./nov-prod.component.css']
})
export class NovProdComponent implements OnInit {

  router: Router;
  route: ActivatedRoute;
  servProd: ProdutoService;
  produto: Produto = new Produto();
  enviando: boolean = false;
  editando: boolean = false; //  controla se é criação ou edição

  categorias: CategoriaProduto[] = ['Alimentos', 'Bebidas', 'Doces', 'Castanhas', 'Mel', 'Artesanato', 'Outros'];

  constructor(router: Router, route: ActivatedRoute, servProd: ProdutoService) {
      this.router = router;
      this.route = route;
      this.servProd = servProd;
  }

  incluir():void{
    this.enviando = true;

    if (this.editando) {
      console.log("Salvando edição");
      this.servProd.atualizar(this.produto)
          .subscribe(_ => {
            this.enviando = false;
            this.router.navigateByUrl("/produto");
          });
    } else {
      console.log("Incluir Produto");
      this.servProd.adicionar(this.produto)
          .subscribe(_ => {
            this.enviando = false;
            this.router.navigateByUrl("/produto");
          });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.servProd.obterPorId(id).subscribe(produto => {
        this.produto = produto;
      });
    }
  }

}