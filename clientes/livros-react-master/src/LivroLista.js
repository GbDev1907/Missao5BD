import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        controleLivro.obterLivros().then(livros => {
            setLivros(livros);
            setCarregado(true);
        });
    }, [carregado]);

    const excluirLivro = async (codigoLivro) => {
        controleLivro.excluir(codigoLivro).then(() => {
            setCarregado(false);
        })
    };

    const LinhaLivro = ({ livro }) => {
        const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

        return (
            <tr key={livro.codigo}>
                <td>{livro.titulo}</td>
                <td>{nomeEditora}</td>
                <td>{livro.resumo}</td>
                <td>
                    <ul>
                        {livro.autores.map((autor, index) => (
                            <li key={index}>{autor}</li>
                        ))}
                    </ul>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => excluirLivro(livro.codigo)}>Excluir</button>
                </td>
            </tr>
        );
    };

    return (
        <main>
            <h1>Lista de Livros</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Editora</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <LinhaLivro key={index} livro={livro} />
                    ))}
                </tbody>
            </table>
            <Link to="../dados" className="btn btn-success">Novo Livro</Link>
        </main>
    );
};

export default LivroLista;
