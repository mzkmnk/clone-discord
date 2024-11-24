import {GroupQuery} from "~/server/database/query/group.query";

/** グループにユーザを追加する */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data = await GroupQuery.insertUser({userId:body.userId,groupId:body.groupId,role:body.role})

    return {
        data
    }
});
