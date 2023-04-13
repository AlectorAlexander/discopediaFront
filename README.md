# Contexto
A Discopédia é um projeto pessoal onde utilizei quase todos os meus conhecimentos em Desenvolvimento Web, adquiridos durante meus estudos na escola Trybe.

A ideia era criar uma enciclopédia de discos na qual os usuários pudessem ter uma conta pessoal na aplicação, conhecer discos lançados em território nacional por meio de navegação livre ou filtros e barras de pesquisa disponíveis, ter acesso a informações detalhadas desses discos, adicioná-los em uma estante virtual, gerenciar essa estante e acessar o link do álbum no YouTube Music.

Para iniciar o projeto, eu precisava de dados, mais precisamente, de dados de discos. Por isso, decidi iniciar o desenvolvimento fazendo raspagens de dados com Python, utilizando a biblioteca Selector para abstrair dados do site "https://discografia.discosdobrasil.com.br". Depois, utilizei as informações abstraídas para fazer uma segunda raspagem, dessa vez utilizando a biblioteca Selenium (basicamente, deixei o selenium utilizar o nome do artista + nome do álbum para pesquisar disco a disco e inserir o link no JSON criado anteriormente). Você pode conferir como fiz essa raspagem neste repositório: https://github.com/AlectorAlexander/discoteca-back-end.

Após isso, foi a hora de construir a API em CRUD, que alimentaria a aplicação, onde utilizei habilidades como Programação Orientada a Objetos, Interfaces, Classes e afins. Optei pelo banco de dados NoSQL MongoDB com Typescript no NodeJs. Você pode conferir o Back-End deste projeto em: https://github.com/AlectorAlexander/discopedia.

Com a API pronta, foi a hora de partir para o Front-End, onde me sinto mais à vontade. Resolvi utilizar ReactJS com Bootstrap e CSS (em que utilizei tanto para estilizar, quanto para deixar a aplicação 100% responsiva). Para comunicação com o Back-End, eu utilizei o Axios. Para gerenciamento de estado, usei tanto o Redux quanto ContextAPI.



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
Você pode acessá-la através do link <a href="https://discopediafront-production.up.railway.app/">aqui</a> ou pode instalá-la localmente, seguindo os seguintes passos:

## Rodando a aplicação localmente.

Entre neste <a href="https://github.com/AlectorAlexander/discopedia/tree/master">repositório aqui</a>, que é o repositório do back-end desta aplicação, siga todas as etapas de instalação e não se esqueça de iniciar o back-end com:

``` bash
npm start
``` 
Após a instalação e inicialização do back-end, clone esse repositório com 
``` bash
git clone git@github.com:AlectorAlexander/discopediaFront.git
``` 
entre na pasta `śrc/services` abra o arquivo `BDsRequests.js` e troque o valor da variável `baseURL` que está declarada como 'https://discopedia-production.up.railway.app/', e troque esse valor por `http://localhost:3001/`
Agora, abra o terminal na pasta raiz do projeto e ordene:

``` bash
npm install
``` 

## Executando aplicação

  ``` bash
  npm start
  ```
