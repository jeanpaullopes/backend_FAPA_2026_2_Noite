-- Cria usuarios conforme o script SQL, incluindo chaves primárias e valores únicos.
CREATE TABLE "usuarios" (
    "id" CHAR(20) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- Índices únicos espelham as regras UNIQUE definidas para usuários.
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- Cria clientes; somente os campos marcados NOT NULL no SQL são obrigatórios.
CREATE TABLE "clientes" (
    "id" VARCHAR(20) NOT NULL,
    "nome_fantasia" VARCHAR(255),
    "razao_social" VARCHAR(255),
    "cpf_cnpj" VARCHAR(20) NOT NULL,
    "tipo" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "clientes_tipo_check" CHECK (LOWER("tipo") IN ('físico', 'jurídico'))
);

-- Índice único impede que o mesmo CPF/CNPJ seja cadastrado mais de uma vez.
CREATE UNIQUE INDEX "clientes_cpf_cnpj_key" ON "clientes"("cpf_cnpj");

-- Cria produtos com preço decimal, preservando a precisão definida no script.
CREATE TABLE "produtos" (
    "id" CHAR(20) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "departamento" VARCHAR(100),
    "codigo_barras" VARCHAR(13) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "produtos_preco_check" CHECK ("preco" >= 0)
);

-- Índice único impede códigos de barras duplicados.
CREATE UNIQUE INDEX "produtos_codigo_barras_key" ON "produtos"("codigo_barras");
