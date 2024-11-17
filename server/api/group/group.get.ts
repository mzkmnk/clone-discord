import {GroupQuery} from "~/server/database/query/group.query";

export default defineEventHandler(async (event) => {

    const data = await GroupQuery.getAll({userId:'5f20ca88-1352-467b-966e-d42950e299d4'})

    console.log('data',data);

    return {
        data
    }
});
