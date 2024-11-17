import {db} from "~/server/database";
import {groupMembersTable, groupsTable} from "~/server/database/schema";

export namespace GroupQuery {

    /** グループを作成する */
    export const create = ({id,name,description}:{id:string,name:string,description?:string}) => {
        return db.insert(groupsTable).values({
            id,
            name,
            description,
        });
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
