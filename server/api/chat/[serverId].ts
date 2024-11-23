import {db} from "~/server/database";

export default defineEventHandler(async (event) => {
  const serverId = getRouterParam(event,'serverId');

  if(serverId === undefined){
    return {
      statusCode: 404,
    }
  }

  const serverChats = await db.query.groupMessagesTable.findMany({
    where(fields, {eq}) {
        return eq(fields.groupId,serverId);
    },
  });

  return {
    statusCode: 200,
    serverChats,
  }
});
