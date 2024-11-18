import {UserQuery} from "~/server/database/query/user.query";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data = await UserQuery.create({
        id:body.id,
        email:body.email,
        name:body.name,
        fullName:body.fullName,
    }).returning()

    return {
        data
    }
});
