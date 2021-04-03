<h1 align="center">Climão</h1>

<p align="center">Site responsivo para mostrar os dados meteorológicos da sua localização, mostrando seu endereço na tela e de qualquer lugar do mundo</p>

<h1 align="center">
Web
  <img
    alt="Web"
    src="/src/assets/screenshots/web.gif"
  />
  </h1>
  <h2 align="center">
  Mobile
  <img
    alt="Mobile"
    src="/src/assets/screenshots/mobile.gif"
    height=400
    width=400
  />
</h2>

# Tabela de conteúdos

<!--ts-->

- [Tabela de Conteudo](#tabela-de-conteudo)
- [Funcionalidades](#Funcionalidades)
- [Tecnologias](#Tecnologias)
- [Como usar](#como-usar)
- [Decisões e Problemas](https://github.com/Tsugami/Softwrap/issues/1)
<!--te-->

### Funcionalidades

- [x] Pegar localização atual, mostrando seu endereço
- [x] Mostrar todos os dados meteorológicos, de acordo com as coordenadas
- [x] Imagem animada de acordo com o tempo e a hora(exemplo: se for dia, sem chuva(céu limpo), aparece sol.)
- [x] Pegar dados meteorológicos do mundo inteiro
- [x] Botão com refresh

### Tecnologias

- [ReactJs](https://pt-br.reactjs.org/)
- [Styled-Components](https://styled-components.com/)
- [Material-UI](https://material-ui.com/pt/)
- [Axios](https://github.com/axios/axios)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [React Google Maps - api](https://www.npmjs.com/package/@react-google-maps/api)
- [Use Places Autocomplete](https://www.npmjs.com/package/use-places-autocomplete)

### Como usar

```bash
# Clone o repositório
$ git clone https://github.com/alexjou/climao

# Entre na pasta
$ cd climao

# Instale as dependencias
$ yarn install

# Inicie o site
$ yarn start
```
