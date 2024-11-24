import {db} from "~/server/database";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event,'userId');

  if(userId === undefined) {
    return {
      status:404,
    };
  }

  const user = await db.query.usersTable.findFirst({
    where(fields, {eq}) {
        return eq(fields.id,userId);
    },
  })

  if(user === undefined){
    setResponseStatus(event,404);
    return {
      status:404,
    }
  }

  return {
    status:200,
    user,
  };
});
