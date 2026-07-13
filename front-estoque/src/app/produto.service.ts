import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosUrl = "http://localhost:3000/produto";
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(http: HttpClient) {
    this.http = http;
  }

  // Retorno, mesmo que vazio, impede que o app trave
  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation + " :: " + error);
      return of(result as T);
    };
  }

  adicionar(produto: Produto): Observable<any> {
    const { _id, ...produtoSemId } = produto; // remove o _id do objeto
    return this.http.post<Produto>(this.produtosUrl, produtoSemId, this.httpOptions)
      .pipe(
        tap((novo: any) => console.log(`Adicionado id=${novo.insertedId}`)),
        catchError(this.handleError<Produto>('adicionar'))
      );
  }

  remover(_id: string): Observable<Produto> {
    const url = `${this.produtosUrl}/${_id}`;
    return this.http.delete<Produto>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Removido id=${_id}`)),
      catchError(this.handleError<Produto>('remover'))
    );
  }

  obterPorId(_id: string): Observable<Produto> {
    const url = `${this.produtosUrl}/${_id}`;
    return this.http.get<Produto>(url)
      .pipe(
        tap(_ => console.log(`Produto id=${_id} recuperado`)),
        catchError(this.handleError<Produto>('obterPorId'))
      );
  }

  obterTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.produtosUrl)
      .pipe(
        tap(_ => console.log('Produtos recuperados')),
        catchError(this.handleError<Produto[]>('obterTodos', []))
      );
  }

  // PUT - atualiza o produto inteiro
  atualizar(produto: Produto): Observable<any> {
    const url = `${this.produtosUrl}/${(produto as any)._id}`;
    return this.http.put(url, produto, this.httpOptions).pipe(
      tap(_ => console.log(`Atualizado id=${(produto as any)._id}`)),
      catchError(this.handleError<any>('atualizar'))
    );
  }

  // PATCH - atualiza só os campos enviados
  atualizarParcial(_id: string, camposParciais: Partial<Produto>): Observable<any> {
    const url = `${this.produtosUrl}/${_id}`;
    return this.http.patch(url, camposParciais, this.httpOptions).pipe(
      tap(_ => console.log(`Atualizado parcialmente id=${_id}`)),
      catchError(this.handleError<any>('atualizarParcial'))
    );
  }
}


