import supabaseServer from "utils/supabase.server";

interface ServerProps {
  request: Request;
  response: Response;
}

export const emailPasswordSignUp = async (server: ServerProps, payload: { email: string, password: string }) => {
  const { data, error } = await supabaseServer(server).auth.signUp({
    email: payload.email,
    password: payload.password,
  })
  if (error) {
    throw error;
  }
  return data;
};
