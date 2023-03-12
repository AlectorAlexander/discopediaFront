const params = {
    artist: 'Artista',
    title: 'Título',
    musics: 'Musicas',
    Caracteristica: 'Característica',
    Formatos:'Formatos',
    Gravadora:'Gravadora',
    Lancamento:'Lançamento',
    Produtor:'Produtor'
};

export const User_did_search = (resultsNumber, param, searchTerm) => ({
    type: 'User_did_search',
    message: `Foram encontrados ${resultsNumber} resultados, na pesquisa "${searchTerm}" do parâmetro "${params[param]}"`
});

export const not_found_data = ({
    type: 'not_found_data',
    message: 'Não foram encontrados resultados.'
});

export const User_did_NOT_search = ({
    type: 'User_did_NOT_search'
});

export const token_found = ({type: 'token_found'});

export const token_not_found = ({type: 'token_not_found'});