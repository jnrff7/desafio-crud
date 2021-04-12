# Desafio CRUD

Entrega do projeto CRUD NodeJs e ReactJs

## Requisitos para execução do projeto

- [Doker](https://www.docker.com/)
## Estrutura do projeto

Projeto feito utilizando Docker e Docker-compose

- Back: Projeto contendo estrutura NodeJs
- Front: Projeto contendo estrutura ReactJs
- Banco de dados: Postgress configurado via Docker-compose

## Configurações necessárias

No caminho **desafio-crud/back/src/services/sendEmail.js**, modifique as configurações para sua própria chave do mailTrap, substituindo os valores ***{user}***, ***{password}*** pelas suas próprias chaves:


```js
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "{user}",
        pass: "{password}"
    },
});
```

## Executando o projeto:

Para executar o projeto é necessário executar o comando, na raiz do projeto:

```bash
> docker-compose up
```