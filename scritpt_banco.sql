-- Criação da tabela de Usuários
create table usuarios (
   id       char(20) primary key,
   nome     varchar(255) not null,
   email    varchar(255) unique not null,
   senha    varchar(255) not null,
   username varchar(100) unique not null
);

-- Criação da tabela de Clientes
create table clientes (
   id            varchar(20) primary key,
   nome_fantasia varchar(255),
   razao_social  varchar(255),
   cpf_cnpj      varchar(20) unique not null,
   tipo          varchar(20) not null check ( lower(tipo) in ( 'físico',
                                                      'jurídico' ) ),
   email         varchar(255)
);

-- Criação da tabela de Produtos
create table produtos (
   id            char(20) primary key,
   descricao     varchar(255) not null,
   departamento  varchar(100),
   codigo_barras varchar(13) unique not null,
   preco         numeric(10,2) not null check ( preco >= 0 )
);