import {publicProcedure, router} from "~/server/trpc/trpc";
import {z} from "zod";
import {GroupQuery} from "~/server/database/query/group.query";

export const groupRouter = router({
    /** ユーザが所属しているグループを取得する */
    getAll:publicProcedure.input(z.object({
        userId:z.string(),
    })).query(({input}) => {
        return GroupQuery.getAll(input);
    }),

    /** グループを作成する */
    create:publicProcedure.input(z.object({
        id:z.string(),
        name:z.string(),
        description:z.string(),
    })).mutation(({input}) => {
        return GroupQuery.create({...input });
    }),

    /** グループにユーザを追加する */
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
