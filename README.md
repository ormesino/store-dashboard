# Store Dashboard

## Documentação
O ambiente de desenvolvimento utiliza o docker para subir o banco de dados e um admin para visualizar o banco em tempo real (adminer).

## Pré-requisitos
- PHP 8.1
- Composer
- Node.js
- Docker CLI (opcional)

## Comandos

Pra iniciar o projeto, é necessário primeiro estar na pasta `server`, inicializando copiando o arquivo `.env.example` para um `.env` a fim de ser utilizado pela aplicação back-end.

```bash
cp .env.example .env
```

É necessário primeiramente iniciar os _containers_ presentes no arquivo `docker-compose.yaml` que está também na pasta server.

```bash
docker compose up -d
```

Possuindo o PHP instalado, é necessário também instalar todas as dependências do `composer`

```bash
composer install
```

Deve-se rodar o seguinte comando para gerar a chave da API feita em Laravel:

```bash
php artisan key:generate
```

Após isso, deve-se migrar o banco de dados presente ainda na pasta `server`, populando o banco de dados.

```bash
php artisan migrate:fresh --seed 
```

Com o banco de dados populado, basta subir a API PHP através do comando abaixo:

```bash
php artisan serve
```

Possuindo a parte do back-end já pronta, basta acessar a pasta `store-app` e subir a aplicação do front-end.

```bash
npm i
npm run dev
```

Por fim, para utilizar o usuário gerado pelo seed do Laravel, basta logar com as seguintes credenciais:

```
e-mail: admin@example.com
senha: admin
```

As rotas para acesso das endpoints são as seguintes:

- Frontend: http://localhost:3000/
- API: http://localhost:8000/
- Adminer: http://localhost:8080/

Além disso, o arquivo `api-endpoints` possui todos os endpoints da API em PHP para visualização.

## Dependências
- [Laravel Filter Query String](https://github.com/mehradsadeghi/laravel-filter-querystring)
- [Material UI](https://mui.com/material-ui/)

## Próximos passos
### Front-end
- Finalizar a funcionalidade de atualização dos registros das tabelas 
- Implementar a autenticação já feita no back-end
- Linkar páginas de Login e Registrar