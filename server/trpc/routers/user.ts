import {publicProcedure, router} from "~/server/trpc/trpc";
import {z} from "zod";
import {UserQuery} from "~/server/database/query/user.query";

export const userRouter = router({
    create:publicProcedure
        .input(
            z.object({
            id:z.string(),
            email:z.string(),
            name:z.string(),
            fullName:z.string(),
    })).mutation(({input}) => {
        return UserQuery.create(input)
    }),
})
