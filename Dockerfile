
FROM postgres:16

EXPOSE 5432

# Copia scripts SQL de inicialização (se houver uma pasta 'init' no mesmo diretório)
#COPY ./init/ /docker-entrypoint-initdb.d/

# É necessário definir variáveis de ambiente para o PostgreSQL, como usuário, senha e nome do banco de dados.
# Exemplo:
# ENV POSTGRES_USER=meu_usuario
# ENV POSTGRES_PASSWORD=minha_senha
# ENV POSTGRES_DB=meu_banco_de_dados

#Construindo a imagem do Docker com o comando:
# docker build -t meu_postgres:1.0 .

#Para executar o contêiner do PostgreSQL, você pode usar o comando:
# docker run --name postgres-servidor -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=minhasenha -e POSTGRES_DB=meubanco -p 5432:5432 -d meu_postgres:1.0
