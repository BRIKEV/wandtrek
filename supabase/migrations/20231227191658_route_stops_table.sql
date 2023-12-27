create table "public"."coordinates" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "lat" smallint not null,
    "long" smallint not null,
    "tour_id" uuid not null
);


alter table "public"."coordinates" enable row level security;

create table "public"."stops" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "description" text not null,
    "image" text not null,
    "lat" real not null,
    "long" real not null,
    "private" boolean not null,
    "order" smallint,
    "tour_id" uuid not null
);

alter table "public"."stops" enable row level security;

CREATE UNIQUE INDEX coordinates_pkey ON public.coordinates USING btree (id);

CREATE UNIQUE INDEX stops_pkey ON public.stops USING btree (id);

alter table "public"."coordinates" add constraint "coordinates_pkey" PRIMARY KEY using index "coordinates_pkey";

alter table "public"."stops" add constraint "stops_pkey" PRIMARY KEY using index "stops_pkey";

alter table "public"."coordinates" add constraint "coordinates_tour_id_fkey" FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE not valid;

alter table "public"."coordinates" validate constraint "coordinates_tour_id_fkey";

alter table "public"."stops" add constraint "stops_tour_id_fkey" FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE not valid;

alter table "public"."stops" validate constraint "stops_tour_id_fkey";

CREATE POLICY "Enable read access for all users" ON "public"."stops"
AS PERMISSIVE FOR SELECT
TO anon, authenticated
USING (true)

CREATE POLICY "Enable read access for all users" ON "public"."coordinates"
AS PERMISSIVE FOR SELECT
TO anon, authenticated
USING (true)
