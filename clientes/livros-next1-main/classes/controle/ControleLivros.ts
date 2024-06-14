import Livro from '../modelo/Livro';

interface LivroMongo {
    _id: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

const baseURL = "http://localhost:3030/livros";

class ControleLivros {
    async obterLivros() {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data.map((livro: LivroMongo) => new Livro(livro._id || '', livro.codEditora, livro.titulo, livro.resumo, livro.autores));
    }

    async incluir(livro: Livro) {
        const livroMongo: LivroMongo = {
            _id: livro.codigo,
            codEditora: livro.codEditora,
            titulo: livro.titulo,
            resumo: livro.resumo,
            autores: livro.autores
        };
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(livroMongo)
        });
        const data = await response.json();
        return data.ok;
    }
        
    async excluir(codigoLivro: string) {
        const response = await fetch(`${baseURL}/${codigoLivro}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        return data.ok;
    }
}

export default ControleLivros;