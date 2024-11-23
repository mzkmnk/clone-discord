import {db} from "~/server/database";
import {groupMessagesTable} from "~/server/database/schema";
import {createUUID} from "~/composables/libs/utils";

export default defineEventHandler(async (event) => {

  const body= await readBody(event);

  console.log(body);

  const uuid = createUUID();

  await db.insert(groupMessagesTable).values({
    id:uuid,
    userId:body.userId,
    groupId:body.groupId,
    content:body.content,
  });

  return {}
});
