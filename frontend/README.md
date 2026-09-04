# TripleTen — Web Project Around Auth

Aplicação web desenvolvida em React durante o Bootcamp de Desenvolvimento Web da TripleTen.

O projeto começou como uma aplicação de perfil baseada no projeto **Around**, evoluindo progressivamente ao longo das sprints de HTML, CSS e JavaScript para uma arquitetura moderna baseada em React, componentes reutilizáveis, gerenciamento de estado, integração com API REST e, posteriormente, autenticação de usuários.

A versão atual do projeto inclui fluxo de **cadastro, login, logout e proteção de rotas**, além das funcionalidades originais de gerenciamento de perfil e cartões.

---

## Funcionalidades

### Autenticação

- Cadastro de novos usuários
- Login de usuários
- Logout
- Proteção de rotas para usuários autenticados
- Redirecionamento entre as páginas de login, cadastro e aplicação
- Persistência da sessão de autenticação
- Feedback visual para operações de sucesso e erro
- Interface específica para usuários autenticados e não autenticados

### Perfil

- Visualização das informações do usuário
- Edição do perfil
- Atualização do avatar

### Cartões

- Carregamento dos cartões através da API
- Criação de novos cartões
- Curtir e remover curtidas
- Exclusão de cartões
- Confirmação antes da exclusão
- Visualização de imagens em tela cheia

### Interface

- Popups reutilizáveis
- Validação de formulários
- Feedback visual para operações da aplicação
- Layout responsivo
- Adaptação para desktop, tablet e dispositivos móveis

---

## Tecnologias utilizadas

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

---

## Arquitetura

A aplicação utiliza uma arquitetura baseada em componentes reutilizáveis.

Entre os principais componentes estão:

- `App`
- `Header`
- `Main`
- `Footer`
- `Card`
- `Popup`
- `ImagePopup`
- `EditProfile`
- `EditAvatar`
- `NewCard`
- `RemoveCard`
- `Login`
- `Register`
- `ProtectedRoute`
- `InfoTooltip`

O estado global relacionado ao usuário é compartilhado através do `CurrentUserContext`.

As operações assíncronas com a API são realizadas utilizando `Fetch API`, Promises e `async/await`.

---

## Autenticação e rotas

O projeto possui diferentes fluxos de navegação de acordo com o estado de autenticação do usuário.

### Usuário não autenticado

O usuário pode acessar:

- Página de login
- Página de cadastro

### Usuário autenticado

O usuário tem acesso à aplicação principal e às funcionalidades de:

- perfil;
- avatar;
- cartões;
- curtidas;
- exclusão de cartões;
- criação de novos cartões;
- logout.

As rotas que exigem autenticação são protegidas através do componente `ProtectedRoute`.

---

## Feedback de autenticação

As operações de cadastro e autenticação possuem feedback visual para informar o resultado da operação.

São apresentados estados de:

- sucesso;
- erro;
- fechamento do feedback;
- retorno à navegação apropriada.

O componente `InfoTooltip` é utilizado para apresentar essas mensagens ao usuário.

---

## Organização dos estilos

Os estilos CSS estão organizados por blocos dentro de:

```text
src/blocks/

Entre os principais arquivos estão:

auth.css
content.css
elements.css
form.css
header.css
page.css
popup.css
profile.css
tooltip.css

O arquivo auth.css concentra os estilos específicos das páginas de autenticação.

O arquivo tooltip.css concentra os estilos dos feedbacks visuais utilizados durante operações de cadastro e autenticação.

Os estilos são importados através do:

src/index.css
Responsividade

A interface é responsiva e utiliza Media Queries para adaptar o layout a diferentes tamanhos de tela.

Entre as adaptações implementadas estão:

reorganização dos elementos em telas menores;
ajuste de espaçamentos;
adaptação do Header;
navegação compacta em dispositivos móveis;
adaptação dos formulários de autenticação;
ajuste dos popups e mensagens de feedback;
manutenção da usabilidade em diferentes resoluções.

## Estrutura principal do projeto

src/
├── blocks/
│   ├── auth.css
│   ├── content.css
│   ├── elements.css
│   ├── form.css
│   ├── header.css
│   ├── page.css
│   ├── popup.css
│   ├── profile.css
│   └── tooltip.css
│
├── components/
│   ├── App.jsx
│   ├── Card.jsx
│   ├── Header.jsx
│   ├── InfoTooltip.jsx
│   ├── Login.jsx
│   ├── Main.jsx
│   ├── ProtectedRoute.jsx
│   ├── Register.jsx
│   └── ...
│
├── contexts/
│   └── CurrentUserContext.jsx
│
└── index.css