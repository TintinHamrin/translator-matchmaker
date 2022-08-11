import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Query, Resolver } from "type-graphql";
import { TranslatorModel } from "./prisma/generated/type-graphql";
import path from "path";

const prisma = new PrismaClient();

export async function main() {
  const schema = await buildSchema({
    resolvers: [TranslatorResolver],
    validate: false,
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  });

  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
  });

  server
    .listen({
      port: 3001,
    })
    .then(() => {
      console.log("listening");
    });
}

@Resolver((of) => TranslatorModel)
class TranslatorResolver {
  @Query((returns) => [TranslatorModel])
  async translators() {
    return await prisma.translatorModel.findMany();
  }
}

main().catch((e) => console.error(e.details));
