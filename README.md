# Digital Flavor

Sistema web para gestão sustentável de cantinas escolares, desenvolvido como AEP do curso de Engenharia de Software da UniCesumar.

## Integrantes

- Luiz Gustavo Lorençone Enz – 25355642-2
- João Vitor Navari Elias Santos – 25001664-2
- Anthony Vinicius Gomes Oliveira – 25127235-2

## Objetivo

Desenvolver uma aplicação web para auxiliar na gestão de cantinas escolares, possibilitando a realização antecipada de pedidos, o gerenciamento de produtos, o controle de estoque e o registro das vendas, contribuindo para maior organização do atendimento e redução de desperdícios.

## ODS

O projeto está alinhado ao **ODS 12 – Consumo e Produção Responsáveis**, com foco no uso mais eficiente dos recursos da cantina e na redução de desperdícios por meio de um melhor controle de estoque e das vendas.

## Tecnologias

### Front-end
- React
- Vite
- TypeScript

### Back-end
- Java
- Spring Boot

### Banco de Dados
- PostgreSQL 16
- Flyway (versionamento do schema)

## Arquitetura

Fluxo principal da aplicação:

`Usuário -> React/TypeScript -> API REST -> Java/Spring Boot -> PostgreSQL`

## Como executar (back-end)

Pré-requisitos: Java 17+, Maven e Docker.

```bash
# 1. Subir o PostgreSQL
docker compose up -d

# 2. Rodar a API (o Flyway cria as tabelas na primeira execução)
cd src/backend
mvn spring-boot:run

# Testes
mvn test
```

As credenciais padrão de desenvolvimento estão em `.env.example`.

## Requisitos do Sistema

### RF01 – Cadastro e autenticação
O sistema deve permitir o cadastro e a autenticação de usuários, contendo as informações necessárias para identificação e acesso à plataforma.

### RF02 – Perfis de acesso
O sistema deve permitir a existência de diferentes perfis de usuários, incluindo aluno, funcionário, gerente e administrador.

### RF03 – Gerenciamento de produtos
O sistema deve permitir que usuários autorizados cadastrem, consultem, alterem e removam produtos da cantina.

### RF04 – Consulta de produtos
O sistema deve permitir que os alunos consultem os produtos disponíveis, incluindo informações como nome, preço e disponibilidade.

### RF05 – Carrinho de compras
O sistema deve permitir que o aluno adicione e remova produtos de um carrinho antes da confirmação do pedido.

### RF06 – Controle de estoque
O sistema deve permitir o armazenamento e gerenciamento das quantidades disponíveis de cada produto.

### RF07 – Verificação de disponibilidade
O sistema deve verificar a quantidade disponível em estoque antes da confirmação de um pedido.

### RF08 – Realização de pedidos
O sistema deve permitir que o aluno realize antecipadamente um pedido contendo um ou mais produtos.

### RF09 – Pagamentos
O sistema deve permitir o registro da forma de pagamento utilizada no pedido, incluindo PIX e cartão.

### RF10 – Consulta de vendas
O sistema deve permitir que usuários autorizados consultem informações relacionadas às vendas e pedidos realizados.

## Regras de Negócio

- **RN01 – Disponibilidade do produto:** um produto somente poderá ser incluído em um pedido caso exista quantidade suficiente disponível em estoque.
- **RN02 – Atualização do estoque:** após a confirmação de uma venda, a quantidade correspondente aos produtos vendidos deverá ser atualizada.
- **RN03 – Controle de acesso:** funcionalidades administrativas somente poderão ser utilizadas por usuários que possuírem permissão para realizá-las.
- **RN04 – Produto sem estoque:** um produto cuja quantidade disponível seja igual a zero não deverá ser apresentado como disponível para compra.
- **RN05 – Validação do pedido:** um pedido somente poderá ser confirmado caso todos os produtos e quantidades solicitadas estejam disponíveis.
- **RN06 – Associação do pedido:** todo pedido deverá estar associado ao usuário responsável por sua realização.

## Estrutura do Repositório

```text
digital-flavor/
├── src/
│   ├── frontend/          # React + Vite + TypeScript
│   └── backend/           # Java + Spring Boot (API REST)
├── docs/                  # Documento da AEP, Diagrama de Classes e DER
├── database/
│   └── schema.sql         # Script de criação das tabelas (PostgreSQL)
├── docker-compose.yml     # PostgreSQL para desenvolvimento
├── .env.example
├── .gitignore
└── README.md
```

## Cronograma

| Período | Atividade | Responsável |
|---|---|---|
| 11/09/2026 | Definição do escopo, requisitos e arquitetura | Todos |
| 11/09/2026 | Estruturação e elaboração do documento da primeira entrega | João |
| 11/09/2026 | Elaboração do Diagrama de Classes | Luiz e Anthony |
| 11/09/2026 | Elaboração do DER | Luiz e Anthony |
| 11/09/2026 | Criação e organização inicial do repositório GitHub | João |
| 04/11 a 05/11 | Definição do contrato da API (endpoints e formato JSON) | Todos |
| 04/11 a 05/11 | Estrutura do back-end, schema PostgreSQL e entidades do domínio | Luiz |
| 04/11 a 05/11 | Estrutura do front-end (React, Vite, TypeScript), rotas e layout | João |
| 06/11 a 07/11 | Autenticação (JWT), perfis de acesso e CRUD de produtos e estoque (RF01, RF02, RF03, RF04, RF06) | Luiz |
| 06/11 a 07/11 | Serviço e API de pedidos com validação e baixa de estoque (RF05, RF07, RF08) | Anthony |
| 06/11 a 07/11 | Telas de login, cadastro, cardápio e carrinho | João |
| 08/11 a 09/11 | Gestão de usuários, tratamento de erros e CORS | Luiz |
| 08/11 a 09/11 | Pagamentos PIX e cartão, consulta de vendas e dados iniciais (RF09, RF10) | Anthony |
| 08/11 a 09/11 | Telas de pedidos, fila da cantina, gestão de produtos, vendas e usuários | João |
| 10/11 a 11/11 | Integração entre front-end, back-end e banco de dados, testes e correções | Todos |
| 12/11/2026 | Revisão final, instruções de execução e documentação | Todos |
| 13/11/2026 | Entrega final da AEP | Todos |

## Documentação

A pasta `docs/` será utilizada para armazenar o PDF da AEP, o Diagrama de Classes, o DER e demais documentos do projeto.

## Banco de Dados

A pasta `database/` contém o script SQL de criação das tabelas no PostgreSQL (`schema.sql`), compatível com as classes Java. A aplicação executa o mesmo script automaticamente pelo Flyway (`src/backend/src/main/resources/db/migration`).
