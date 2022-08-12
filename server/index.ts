import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import {
  Arg,
  buildSchema,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { TranslatorModel } from "./prisma/generated/type-graphql";
import path from "path";
import { TranslatorResolver } from "./resolvers";

const prisma = new PrismaClient();
// console.log(prisma);

export async function main() {
  const schema = await buildSchema({
    resolvers: [TranslatorResolver],
    validate: false,
    emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  });

  const server = new ApolloServer({
    schema,
    context: () => ({ prisma }),
    // introspection: true,
  });

  server
    .listen({
      port: 3001,
    })
    .then(() => {
      console.log("listening");
    })
    .catch(() => {
      console.log("error connecting");
    });
}

main(); //.catch((e) => console.error);
