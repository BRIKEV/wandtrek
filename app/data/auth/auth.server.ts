import supabaseServer from "utils/supabase.server";

interface ServerProps {
  request: Request;
  response: Response;
}

export type UserType = 'GUIDE' | 'USER';

interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  type: UserType;
}

export const emailPasswordSignUp = async (server: ServerProps, payload: SignUpPayload) => {
  const { data, error } = await supabaseServer(server).auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        type: 'GUIDE',
      },
    },
  })
  if (error) {
    throw error;
  }
  return data;
};
