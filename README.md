# Contexto
Projeto pessoal desenvolvido. Objetivei a criação de uma enciclopédia de discos. Nessa aplicação, o usuário pode encontrar discos, seja através dos filtros disponíveis (o usuário pode pesquisar os discos por título, nome do artista, data de lançamento, nome do produtor, nome de músicas, nome da gravadora, características do disco), ou pela navegação livre, salva-los em uma estante virtual, gerenciar os discos na estante (se deseja excluílos, ir para a página do disco, acessar as músicas) e acessar o álbum completo através do YoutubeMusic. 

<img src='discopedia.gif' alt='Projeto-modelo-atual'>

## Ferramentas

* React
* JavaScript ES6+
* CSS
* Context Api
* Redux
* Axios
* Bootstrap

## Acesso a aplicação:
Você pode acessa-la através do link <a href="https://discopediafront-production.up.railway.app/">aqui.</a> ou pode instalar as dependências localmente, seguindo os seguintes passos:

## Rodando a aplicação localmente.

Entre nesse <a href="https://github.com/AlectorAlexander/discopedia/tree/master">repositório aqui</a>, que é o repositório do back-end dessa aplicação, siga todas as etapas de instalação e não se esqueça de iniciar o back end com 

``` bash
npm start
``` 
Após a instalação e inicialização do back-end, entre na pasta `śrc/services` abra o arquivo `BDsRequests.js` e troque o valor da variável `baseURL` que está declarada como 'https://discopedia-production.up.railway.app/', e troque esse valor por `http://localhost:3001/`
Agora, abra o terminal na pasta raiz do projeto e ordene:

``` bash
npm install
``` 

## Executando aplicação

  ``` bash
  npm start
  ```
