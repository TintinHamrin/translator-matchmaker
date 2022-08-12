import { PrismaClient } from "@prisma/client";
import "reflect-metadata";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { TranslatorModel } from "./prisma/generated/type-graphql";

import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { CreateOneTranslatorModelArgs } from "./prisma/generated/type-graphql";

import {
  transformFields,
  getPrismaFromContext,
  transformCountFieldIntoSelectRelationsCount,
} from "./prisma/generated/type-graphql/helpers";

@Resolver((of) => TranslatorModel)
export class TranslatorResolver {
  @Query((returns) => [TranslatorModel])
  async translators(@TypeGraphQL.Ctx() ctx: any) {
    return await getPrismaFromContext(ctx).translatorModel.findMany();
  }

  @TypeGraphQL.Mutation((_returns) => TranslatorModel, {
    nullable: false,
  })
  async createOneTranslatorModel(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneTranslatorModelArgs
  ): Promise<TranslatorModel> {
    const { _count } = transformFields(graphqlFields(info as any));
    return getPrismaFromContext(ctx).translatorModel.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
