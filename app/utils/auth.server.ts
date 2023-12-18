import { redirect } from "@remix-run/node";
import { getUser } from "~/data/auth/auth.server";

interface ServerProps {
  request: Request;
  response: Response;
}

export const validateAuth = async (server: ServerProps, validRoles = ['USER']) => {
  const user = await getUser(server);
  if (!user) {
    throw redirect('/tours', { headers: server.response.headers });
  }
  return user;
};
