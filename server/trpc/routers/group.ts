import {publicProcedure, router} from "~/server/trpc/trpc";
import {z} from "zod";
import {GroupQuery} from "~/server/database/query/group.query";
import {createUUID} from "~/libs/utils";

export const groupRouter = router({
    create:publicProcedure.input(z.object({
        id:z.string(),
        name:z.string(),
        description:z.string(),
    })).mutation(({input}) => {
        return GroupQuery.create({...input });
    }),

    insertUser:publicProcedure.input(z.object({
        userId:z.string(),
        groupId:z.string(),
        role:z.string().nullable(),
    })).mutation( (  {input}) => {
        return GroupQuery.insertUser({
            ...input,
            role:input.role ?? '',
        })
    }),
})
