import {GroupQuery} from "~/server/database/query/group.query";

/** グループを作成する */
export default  defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data = await GroupQuery.create({
        id:body.id,
        name:body.name,
        description:body.description,
        bucket:body.bucket,
    });

    return {
        data:data,
    }
});
