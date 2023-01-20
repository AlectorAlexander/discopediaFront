import { useState, useEffect, useCallback, useContext } from 'react';
import Context from '../context/Context';

export default function usePaginationData() {
    const { disc, setData, setPageStore } = useContext(Context);
    const [discsSize, setDiscsSize] = useState(0);
    /* discsSize é um state que armazena o tamanho total da lista de discos. Ele é usado para comparar se a lista de discos foi alterada (quando o usuário usa o campo de pesquisa, por exemplo) e, caso tenha sido, executar as operações de paginação novamente. */
    
    let sizeOfData = 0;

    /* A função paginationParty() é responsável por dividir a lista de discos (armazenado no contexto) em grupos de nove discos e atualizar o contexto com esses grupos. Ela funciona verificando se a lista de discos tem no máximo 9 itens, caso sim, ela atualiza o contexto com a lista inteira. Caso contrário, ela divide a lista em grupos de 9 itens e armazena esses grupos no contexto usando o setData. */
    const paginationParty = () => {
        if (disc.length <= 9) {
            return setData([disc]);
        }
        const discsLeftOver = disc.length % 9;
        const justNineDiscs = (disc.length - discsLeftOver);
        for (let i = 0; i < justNineDiscs ; i += 9) {
            if (sizeOfData >= justNineDiscs) {
                break;
            }
            const nineDiscs = [];
            
            for (let index = i; index < i + 9; index++) {
                const element = disc[index];
                nineDiscs.push(element);
                sizeOfData += 1;
            }
            setData((prev) => [...prev, nineDiscs]);
        }
        /* Se houver itens restantes na lista depois de dividir em grupos de 9, esses itens restantes são adicionados ao último grupo e também armazenados no contexto.
        A função também atualiza o state sizeOfData para armazenar a quantidade de discos divididos e adicionados ao contexto. */
        if (sizeOfData < disc.length) {
            const leftOver = disc.slice((sizeOfData -1), disc.length - 1);
            sizeOfData += leftOver.length;
            setData((prev) => [...prev, leftOver], setDiscsSize(disc.length));
        }
    };
    


    useEffect(() => {
        if (disc.length > 0 || discsSize > disc.length) {
            setDiscsSize(disc.length);
            sizeOfData = 0;
            setData([]);
            paginationParty();
        } 
    }, [disc]);


    const onChangePage = useCallback((newPage) => {
        window.scroll(0, 300);
        setPageStore(newPage);
    }, []);
            
    return { onChangePage };
}            