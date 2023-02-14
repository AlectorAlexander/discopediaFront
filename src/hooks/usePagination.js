import { useEffect, useCallback, useContext } from 'react';
import Context from '../context/Context';

export default function usePaginationData() {
    const { disc, setData, Loading, setPageStore, setLoading, ActualPage, pageStore } = useContext(Context);
    
    const paginationParty = () => {
        if (disc.length <= 9) {
            setData([disc]);
            return setLoading(false);
        } else {
            setData((prev) => {
                let next = prev;
                next[pageStore - 1] = ActualPage;
                return next;
            });
        }
        setLoading(false);
    };
    
    


    useEffect(() => {
        if (disc && disc.length > 0) {
            paginationParty();
        }
    }, [ActualPage]);

    useEffect(() => {
        if (!Loading) {
            return window.scroll(0, 300);
        }
    }, [Loading]);


    const onChangePage = useCallback((newPage) => {
        setPageStore(newPage);
        setLoading(true);
    }, []);
            
    return { onChangePage };
}            