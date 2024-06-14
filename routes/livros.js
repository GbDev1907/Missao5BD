const express = require('express');
const router = express.Router();
const { obterLivros, incluir, excluir } = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
    const livros = await obterLivros();
    res.json(livros);
});

router.post('/', async (req, res) => {
    const livro = req.body;
    try {
        await incluir(livro);
        res.json({ message: 'Livro incluído com sucesso!' });
    } catch (err) {
        res.json({ message: 'Falha ao incluir o livro.', error:err });
    }
});

router.delete('/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try {
        await excluir(codigo);
        res.json({ message: 'Livro excluído com sucesso!' });
    } catch (err) {
        res.json({ message: 'Falha ao excluir o livro.', error: err });
    }
});

module.exports = router;