import supabaseServer from "utils/supabase.server";

interface ServerProps {
  request: Request;
  response: Response;
}

interface Tour {
  id: string;
  title: string;
  summary: string;
  country: string;
  city: string;
  image: string | null;
  created_at: string;
}

const mapTour = (tours: Tour[]) => (
  tours.map(item => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    country: item.country,
    city: item.city,
    image: item.image,
    createdAt: item.created_at,
  }))
);

export const createDraftTour = async (server: ServerProps, title: string, userId: string) => {
  console.log('????');
  const { data, error } = await supabaseServer(server).from('tours')
    .insert({
      city: 'ADD VALUE',
      country: 'ADD VALUE',
      description: 'ADD VALUE',
      owner: userId,
      summary: title,
      title: title,
    }).select('id').single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getUserTours = async (server: ServerProps, userId: string) => {
  const { data, error } = await supabaseServer(server).from('tours')
    .select(`
      id,
      title,
      summary,
      country,
      city,
      image,
      created_at
    `)
    .eq('owner', userId)
    .order('created_at', { ascending: true });
  if (error) {
    throw error;
  }
  return mapTour(data);
};

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
    tours: mapTour(data),
  };
};

export const getTour = async (server: ServerProps, id: string) => {
  const { data, error } = await supabaseServer(server).from('tours')
    .select(`
      id,
      title,
      description,
      country,
      city,
      image,
      created_at,
      stops (
        id,
        order,
        title,
        lat,
        long
      )
    `)
    .eq('id', id)
    .order('order', { referencedTable: 'stops', ascending: true })
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getTourCoordinates = async (server: ServerProps, id: string) => {
  const { data, error } = await supabaseServer(server).from('coordinates')
    .select(`
      lat,
      long
    `)
    .eq('tour_id', id);
  if (error) {
    throw error;
  }
  return data;
};

export const getStop = async (server: ServerProps, id: string) => {
  const { data, error } = await supabaseServer(server).from('stops')
    .select(`
      id,
      title,
      description,
      image
    `)
    .eq('id', id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};
