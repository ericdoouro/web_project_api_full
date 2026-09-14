# Around the U.S. — Projeto 18

Aplicação web desenvolvida durante o Bootcamp de Desenvolvimento Web da TripleTen.

O projeto **Around the U.S.** evoluiu ao longo das etapas do curso, começando como uma aplicação front-end e chegando a uma arquitetura completa com **React no front-end, API REST própria no back-end, autenticação de usuários, autorização e banco de dados MongoDB**.

A aplicação permite que usuários autenticados gerenciem seu perfil e cartões com imagens, incluindo criação, exclusão, curtidas e visualização de imagens em tela cheia.

---

## Descrição do projeto

O **Around the U.S.** é uma aplicação web responsiva de compartilhamento de lugares e imagens.

Na versão atual, o projeto possui um front-end desenvolvido em React integrado a uma API REST própria desenvolvida com Node.js e Express.js.

Os dados de usuários e cartões são armazenados em um banco de dados MongoDB utilizando Mongoose.

A aplicação possui um sistema completo de autenticação e autorização utilizando **JSON Web Token (JWT)**, permitindo proteger as rotas e controlar o acesso dos usuários aos recursos da aplicação.

---

## Funcionalidades

### Autenticação

- Cadastro de novos usuários
- Login de usuários
- Logout
- Autenticação utilizando JWT
- Persistência da sessão de autenticação
- Proteção de rotas
- Redirecionamento entre páginas de login, cadastro e aplicação
- Validação dos dados de cadastro e login
- Feedback visual para operações de sucesso e erro

### Perfil

- Visualização das informações do usuário
- Edição do nome e ocupação
- Atualização do avatar
- Recuperação dos dados do usuário autenticado

### Cartões

- Carregamento dos cartões através da API
- Criação de novos cartões
- Curtir cartões
- Remover curtidas
- Exclusão de cartões próprios
- Proteção contra exclusão de cartões de outros usuários
- Confirmação antes da exclusão
- Visualização das imagens em tela cheia

### Interface

- Layout responsivo
- Adaptação para desktop, tablet e dispositivos móveis
- Popups reutilizáveis
- Validação de formulários
- Feedback visual para operações da aplicação
- Fechamento de popups por botão, clique externo ou tecla Esc

---

## Tecnologias utilizadas

### Front-end

- HTML5
- CSS3
- JavaScript (ES6+)
- React
- React Router
- React Hooks
  - `useState`
  - `useEffect`
  - `useContext`
  - `useRef`
- Context API
- Fetch API
- REST API
- Vite
- ESLint

### Back-end

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Celebrate
- Validator
- Nodemon
- ESLint
- PM2

### Conceitos e técnicas

- API RESTful
- Express Router
- Componentização
- Gerenciamento de estado
- Context API
- Autenticação e autorização
- JSON Web Token
- Hash de senhas
- Middleware de autenticação
- Validação de dados
- Tratamento centralizado de erros
- CORS
- Logs de requisições e erros
- MongoDB Operators
- Controle de acesso aos recursos

---

### Arquitetura do projeto

O projeto está dividido em duas aplicações principais:

```text
web_project_api_full/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── api/
│   ├── app.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

Front-end

A aplicação utiliza uma arquitetura baseada em componentes reutilizáveis.

Entre os principais componentes estão:

App
Header
Main
Footer
Card
Popup
ImagePopup
EditProfile
EditAvatar
NewCard
RemoveCard
Login
Register
ProtectedRoute
InfoTooltip

O estado global relacionado ao usuário é compartilhado através do CurrentUserContext.

As operações com a API são realizadas utilizando a Fetch API, Promises e async/await.

Back-end

O back-end utiliza uma arquitetura organizada em:

routes/
controllers/
models/
middlewares/

Os principais recursos são:

usuários;
cartões;
autenticação;
autorização;
validação;
tratamento de erros.
Autenticação e autorização

A aplicação possui diferentes fluxos de navegação de acordo com o estado de autenticação do usuário.

Usuário não autenticado

Pode acessar:

página de login;
página de cadastro.
Usuário autenticado

Tem acesso às funcionalidades de:

perfil;
avatar;
cartões;
curtidas;
criação de cartões;
exclusão de seus próprios cartões;
logout.

As rotas protegidas utilizam um middleware de autenticação baseado em JWT.

O token possui validade de 7 dias e identifica o usuário através do seu _id.

As senhas dos usuários são armazenadas utilizando hash com bcryptjs.

API

A aplicação possui uma API REST própria desenvolvida com Express.js.

Autenticação
POST /api/signup
POST /api/signin
Usuários
GET    /api/users
GET    /api/users/me
GET    /api/users/:userId
PATCH  /api/users/me
PATCH  /api/users/me/avatar
Cartões
GET    /api/cards
POST   /api/cards
DELETE /api/cards/:cardId
PUT    /api/cards/:cardId/likes
DELETE /api/cards/:cardId/likes

As rotas protegidas exigem um token JWT enviado no cabeçalho:

Authorization: Bearer <token>
Validação e tratamento de erros

A API possui validação dos dados recebidos nas requisições.

São utilizados:

Mongoose;
Celebrate;
Validator;
validações específicas dos campos.

A aplicação também possui tratamento centralizado de erros.

Entre os códigos HTTP tratados estão:

400 — Dados inválidos
401 — Autorização necessária
403 — Acesso proibido
404 — Recurso não encontrado
409 — Conflito
500 — Erro interno do servidor

As respostas de erro são retornadas no formato:

{
  "message": "Mensagem do erro"
}
Banco de dados

Os dados da aplicação são armazenados no MongoDB.

O Mongoose é utilizado para definir os schemas e models da aplicação.

Usuários

Os usuários possuem informações como:

e-mail;
senha protegida por hash;
nome;
ocupação;
avatar.

O e-mail é único e possui validação.

Cartões

Os cartões possuem informações como:

nome;
link da imagem;
proprietário;
curtidas;
data de criação.

O proprietário do cartão é relacionado ao usuário através do MongoDB.

Segurança

Entre as medidas implementadas estão:

autenticação através de JWT;
senhas armazenadas com hash;
proteção das rotas;
controle de acesso aos recursos;
validação dos dados recebidos;
validação de URLs;
variável JWT_SECRET armazenada em .env;
configuração de CORS;
senha do usuário excluída das respostas da API.
CORS

O back-end possui configuração de CORS para permitir a comunicação entre o front-end e a API.

Durante o desenvolvimento local, a aplicação utiliza:

http://localhost:5173

A configuração de produção será atualizada com o domínio definitivo da aplicação após o deploy.

Logs

A aplicação possui registros de:

requisições;
erros do servidor.

Os arquivos de log são ignorados pelo Git e não devem ser versionados no repositório.

Gerenciamento do servidor

O back-end utiliza PM2 para gerenciamento do processo da aplicação.

Também foi implementado o endpoint:

/crash-test

Esse endpoint permite testar a recuperação automática do servidor.

Durante o teste, o servidor foi derrubado propositalmente e o PM2 detectou a falha e reiniciou automaticamente a aplicação.

Após a recuperação, a API voltou a responder normalmente.

Testes realizados

Durante o desenvolvimento foram realizados testes das principais funcionalidades da aplicação.

Autenticação
Cadastro de usuário
Cadastro com e-mail duplicado
Cadastro com senha inválida
Login com credenciais válidas
Login com senha incorreta
Acesso a rotas protegidas sem token
Acesso a rotas protegidas com token válido
Perfil
Edição do perfil
Atualização do avatar
Persistência das alterações após atualização da página
Cartões
Criação de cartões
Curtidas
Remoção de curtidas
Exclusão do próprio cartão
Tentativa de exclusão de cartão pertencente a outro usuário
API
Validação de dados
Tratamento de erros
Códigos HTTP
CORS
Rotas inexistentes
Autorização
Recuperação do servidor

Foi realizado o teste de falha através do endpoint:

/crash-test

O servidor foi derrubado propositalmente e o PM2 realizou automaticamente o reinício do processo.

Após o reinício, uma nova requisição à API confirmou que o servidor estava funcionando novamente.

Como executar o projeto localmente
Pré-requisitos

É necessário ter instalado:

Node.js
npm
MongoDB ou acesso a um banco MongoDB
Git
Backend

Entre na pasta:

cd backend

Instale as dependências:

npm install

Configure as variáveis de ambiente no arquivo .env.

Exemplo:

MONGODB_URI=sua_uri_do_mongodb
JWT_SECRET=seu_segredo_jwt
PORT=3000

Inicie o servidor:

npm run start

Durante o desenvolvimento, pode ser utilizado:

npm run dev

O backend estará disponível em:

http://localhost:3000

Para executar o linter:

npm run lint
Frontend

Em outro terminal:

cd frontend

Instale as dependências:

npm install

Inicie a aplicação:

npm run dev

O front-end estará disponível em:

http://localhost:5173
Variáveis de ambiente

As informações sensíveis da aplicação são armazenadas em variáveis de ambiente.

O arquivo .env não deve ser versionado no Git.

Entre as principais variáveis utilizadas pelo backend estão:

MONGODB_URI=
JWT_SECRET=
PORT=
Deploy
Aplicação

URL da aplicação:

A SER PREENCHIDA APÓS O DEPLOY
Servidor

Domínio do servidor:

A SER PREENCHIDO APÓS O DEPLOY
Imagens do projeto

Capturas de tela da aplicação podem ser adicionadas nesta seção para demonstrar as principais funcionalidades.

### Uma correção importante em relação à versão anterior

Eu incluí agora a seção **"Testes realizados"**, porque ela representa melhor o que realmente fizemos e é útil para o instrutor avaliar o projeto.

Também deixei **Deploy** separado. Isso é importante porque não devemos declarar que o projeto está implantado enquanto ainda estamos chegando nessa parte.