# Traduza o Readme Ação

## Readme tradução.

-   [inglês](README.md)
-   [Chinês simplificado](README.zh-CN.md)
-   [chinês tradicional](README.zh-TW.md)
-   [hindi](README.hi.md)
-   [francês](README.fr.md)
-   [árabe](README.ar.md)

**Ação do github para traduzir readme para qualquer idioma**

Esta é uma ação do Github que traduz automaticamente o Readme no seu repo para um idioma especificado.

_Uma submissão para o[Dev: Ações do GitHub para código aberto!](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn) hackathon_

## Configurar

1.  **Adicionar um arquivo de fluxo de trabalho**para o seu projeto (por exemplo,`.github/workflows/readme.yml`):


    name: Translate README

    on:
      push:
        branches:
          - main
          - master
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - name: Setup Node.js
            uses: actions/setup-node@v1
            with:
              node-version: 12.x
          # ISO Langusge Codes: https://cloud.google.com/translate/docs/languages  
          - name: Adding README - Chinese Simplified
            uses: dephraiim/translate-readme@main
            with:
              LANG: zh-CN
          - name: Adding README - Chinese Traditional
            uses: dephraiim/translate-readme@main
            with:
              LANG: zh-TW
          - name: Adding README - Hindi
            uses: dephraiim/translate-readme@main
            with:
              LANG: hi
          - name: Adding README - Arabic
            uses: dephraiim/translate-readme@main
            with:
              LANG: ar
          - name: Adding README - French
            uses: dephraiim/translate-readme@main
            with:
              LANG: fr

## Configuração

### Opções

Você pode configurar a ação ainda mais com as seguintes opções:

-   `LANG`: A linguagem que você deseja traduzir seu readme para. O padrão é simplificado chinês. (Eu sou um ganense) Os idiomas suportados podem ser encontrados abaixo. 
     (padrão:`zh-CH`) (requeridos:`false`)

## Línguas suportadas

Idiomas suportados podem ser encontrados aqui[https://cloud.google.com/translate/docs/Languages.](https://cloud.google.com/translate/docs/languages)

### questões

Verificar[aqui](https://github.com/dephraiim/translate-readme/issues/1)para questões relacionadas a esta ação.

### Desenvolvimento

Sugestões e contribuições são sempre bem vindas!

### LICENÇA

[COM](./LICENSE)
