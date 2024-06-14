import { useState, useEffect } from "react";
import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (number: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const [nomeEditora, setNomeEditora] = useState<string>("");

  useEffect(() => {
    async function fetchEditoraName() {
      const nome = await controleEditora.getNomeEditora(props.livro.codEditora);
      if (nome) {
        setNomeEditora(nome);
      }
    }

    fetchEditoraName();
  }, [props.livro.codEditora]);

  return (
    <tr>
      <td className='border-bottom text-center py-2'>
        {props.livro.titulo}
        <br />
        <button onClick={() => props.excluir(Number(props.livro.codigo))} className="btn btn-danger">Excluir</button>
      </td>
      <td className='border-bottom py-2' style={{textAlign: 'justify'}}>{props.livro.resumo}</td>
      <td className='border-bottom py-2 text-center'>{nomeEditora}</td>
      <td className='border-bottom py-2'>
        <ul>
          {props.livro.autores &&
            props.livro.autores.map((autor, index) => <li key={index}>{autor}</li>)}
        </ul>
      </td>
    </tr>
  );
};
