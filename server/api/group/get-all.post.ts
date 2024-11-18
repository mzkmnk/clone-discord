import {GroupQuery} from "~/server/database/query/group.query";

/** ユーザが所属しているグループを取得する */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const data = await GroupQuery.getAll({userId:body.userId})
    return {
        data
    }
});
