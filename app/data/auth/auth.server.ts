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

export const emailPasswordLogin = async (server: ServerProps, payload: Pick<SignUpPayload, 'email' | 'password'>) => {
  const { data, error } = await supabaseServer(server).auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  })
  if (error) {
    throw error;
  }
  return data;
};

export const getSession = async (server: ServerProps) => {
  const { error, data } = await supabaseServer(server).auth.getSession()
  if (error) {
    throw error;
  }
  return data;
};

export const getUser = async (server: ServerProps) => {
  const { error, data } = await supabaseServer(server).auth.getSession()
  if (error) {
    throw error;
  }
  return data.session ? data.session.user : null;
};
