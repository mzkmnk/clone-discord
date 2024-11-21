import {db} from "~/server/database";

/** ユーザが所属しているグループを取得する */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    /** ユーザが所属しているグループのIdを取得する */
    const groupIdList = await db.query.groupMembersTable.findMany({
        where(fields, operators){
            return operators.eq(fields.userId,body.userId);
        },
        columns:{
            groupId:true,
        }
    })

    const groups: {id: string,name: string,iconUrl: string | null ,createdAt: Date, description: string | null,bucket: string | null}[] = [];

    // グループIDから各グループの情報を取得する。
    await Promise.all(
        groupIdList.map(async (val) => {
            const group = await db.query.groupsTable.findFirst({
                where(fields, operators) {
                    return operators.eq(fields.id,val.groupId)
                },
            })
            if(group){
                groups.push(group);
            }
        }),
    )

    return {
        data: groups,
    }
});
