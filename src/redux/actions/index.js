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

export const User_did_NOT_search = ({
    type: 'User_did_NOT_search'
});