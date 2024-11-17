import {db} from "~/server/database";
import {usersTable} from "~/server/database/schema";

export namespace UserQuery {

    /** 全てのユーザを取得する */
    export const getAll = () => {
        return db.select().from(usersTable);
    }

    /** ユーザを作成する */
    export const create =  ({id,email,name,fullName}:{id:string,email:string,name:string,fullName:string}) => {
        return db.insert(usersTable).values({
            id,
            email,
            name,
            fullName,
        })
    };
}
