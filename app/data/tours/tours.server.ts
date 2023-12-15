import supabaseServer from "utils/supabase.server";

interface ServerProps {
  request: Request;
  response: Response;
}

export const getTours = async (server: ServerProps) => {
  const { data, count, error } = await supabaseServer(server).from('tours')
    .select(`
      id,
      title,
      summary,
      country,
      city,
      image,
      created_at
    `).order('created_at', { ascending: true });
  if (error) {
    throw error;
  }
  return {
    count,
    tours: data.map(item => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      country: item.country,
      city: item.city,
      image: item.image,
      createdAt: item.created_at,
    })),
  };
};
