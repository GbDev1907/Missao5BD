import Livro from './modelo/Livro';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ControleLivros from '../src/controle/ControleLivros';
import ControleEditora from '../src/controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    const [nomeEditora, setNomeEditora] = useState('');
    const [opcoes, setOpcoes] = useState(controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    })));

    const navigate = useNavigate();

    const tratarCombo = async (event) => {
        event.preventDefault();
        const autoresArray = autores.split('\n').map(str => str.trim());
        const livro = new Livro('', codEditora, titulo, resumo, autoresArray);
        await controleLivro.incluir(livro).then(() => {
            navigate('/');
        });

        if (!codEditora && nomeEditora) {
            const novaEditora = controleEditora.adicionarEditora(nomeEditora);
            setOpcoes([...opcoes, { value: novaEditora.codEditora, text: novaEditora.nome }]);
            setCodEditora(novaEditora.codEditora);
        }

        controleLivro.incluir(livro);
        navigate('/');
    };

    return (
        <main>
            <h1>Cadastro de Livro</h1>
            <form onSubmit={tratarCombo}>
                <div className='mb-3'>
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input type='text' className='form-control' id='titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor="resumo" className='form-label'>Resumo</label>
                    <textarea className='form-control' id='resumo' value={resumo} onChange={(e) => setResumo(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor='autores' className='form-label'>Autores (Separe po linha)</label>
                    <textarea className="form-control" id='autores' value={autores} onChange={(e) => setAutores(e.target.value)} />
                </div>

                <div className='mb-3'>
                    <label htmlFor='codEditora' className='form-label'>Editora</label>
                    <select className='form-select' id='codEditora' value={codEditora} onChange={(e) => setCodEditora(e.target.value)}>
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-3'>
                    <label htmlFor='nomeEditora' className='form-label'>Nome da Editora (opcional)</label>
                    <input type='text' className='form-control' id='nomeEditora' value={nomeEditora} onChange={(e) => setNomeEditora(e.target.value)} />
                </div>

                <button type='submit' className='btn btn-primary mb-3'>Salvar</button>
            </form>
            <Link to="/" className='btn btn-warning'>Voltar para Lista de Livros</Link>
        </main>
    );
};

export default LivroDados;
