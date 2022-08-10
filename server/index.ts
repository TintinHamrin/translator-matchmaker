import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema, Query, Resolver } from "type-graphql";
import {
  FindFirstTranslatorModelArgs,
  TranslatorModel,
} from "./prisma/generated/type-graphql";
//import { resolvers } from "../../../prisma/generated/type-graphql";
import path from "path";
import { getPrismaFromContext } from "./prisma/generated/type-graphql/helpers";
import { GraphQLResolveInfo } from "graphql";

const prisma = new PrismaClient();

export async function main() {
  const schema = await buildSchema({
    resolvers: [
      // FindManyTranslatorModelResolver,
      // FindManyTranslatorModel1Resolver,
      // FindFirstTranslatorModelResolver,
      // FindTranslatorsModelResolver,
      TranslatorResolver,
    ],
    //resolvers,
    validate: false,
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  });

  const server = new ApolloServer({
    schema, // from previous step
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
