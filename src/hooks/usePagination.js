import { useState, useEffect, useCallback, useContext } from 'react';
import Context from '../context/Context';

export default function usePaginationData() {
    const { disc, setData } = useContext(Context);
    const [discsSize, setDiscsSize] = useState(0);
    const [page, setPage] = useState(1);
    
    let sizeOfData = 0;

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
        window.scroll(0, 0);
        setPage(newPage);
    }, []);
            
    return { page, onChangePage };
}            