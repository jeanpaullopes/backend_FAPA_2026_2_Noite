/*
sempre importante lembrar de rodar a migration do banco com o comando

npm run prisma:migrate

*/

// Importa o cliente gerado a partir de prisma/schema.prisma.
import { PrismaClient } from "@prisma/client";

// Cria uma única instância por processo; os módulos ESM também reutilizam este arquivo.
const prisma = new PrismaClient();

// Exporta o cliente para que rotas e serviços usem prisma.usuario, prisma.cliente e prisma.produto.
export default prisma;

/**
 * Exemplo de consulta:
 * const usuarios = await prisma.usuario.findMany();
 *
 * Exemplo de criação:
 * const produto = await prisma.produto.create({
 *   data: {
 *     id: "produto-001",
 *     descricao: "Caneta",
 *     codigo_barras: "7891234567890",
 *     preco: 2.5,
 *   },
 * });
 *
 * Exemplo de atualização:
 * await prisma.cliente.update({
 *   where: { id: "cliente-001" },
 *   data: { email: "cliente@exemplo.com" },
 * });
 *
 * Exemplo de remoção:
 * await prisma.usuario.delete({ where: { id: "usuario-001" } });
 *
 * Os exemplos são comentários didáticos: cada operação retorna uma Promise
 * e deve ser aguardada com await dentro de uma função async.
 */
