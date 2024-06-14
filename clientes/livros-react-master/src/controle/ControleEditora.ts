import Editora from '../modelo/Editora';

let editoras: Editora[] = [
    new Editora(1, '')

];

class ControleEditora {
    getEditoras() {
        return editoras;
    }

    getNomeEditora(codEditora: number){
        const editora = editoras.find(editora => editora.codEditora === codEditora);
        return editora ? editora.nome : '';
    }

    adicionarEditora(nome: string) {
        const novaEditora = new Editora(editoras.length + 1, nome);
        editoras.push(novaEditora);
        return novaEditora;
    }
}

export default ControleEditora;
