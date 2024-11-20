import {db} from "~/server/database";
import {groupMembersTable, groupsTable} from "~/server/database/schema";
import {eq} from "drizzle-orm";

export namespace GroupQuery {

    export const getAll = ({userId}:{userId:string}) => {
        return db.select({
            groupId:groupMembersTable.groupId,
        }).from(groupMembersTable).where(eq(groupMembersTable.userId,userId));
    };

    /** グループを作成する */
    export const create = ({id,name,description,bucket,iconUrl}:{id:string,name:string,description?:string,bucket?:string,iconUrl?:string}) => {
        return db.insert(groupsTable).values({
            id,
            name,
            description,
            bucket,
            iconUrl
        }).returning();
    };

    /** グループにユーザを追加する */
    export const insertUser = ({userId,groupId,role}:{userId:string,groupId:string,role:string}) => {
        return db.insert(groupMembersTable).values({
            userId,
            groupId,
            role,
        });
    }
}
