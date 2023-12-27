create table "public"."tours" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "title" text not null,
    "summary" text not null,
    "country" text not null,
    "city" text not null,
    "image" text,
    "description" text not null
);


alter table "public"."tours" enable row level security;

CREATE UNIQUE INDEX tours_pkey ON public.tours USING btree (id);

alter table "public"."tours" add constraint "tours_pkey" PRIMARY KEY using index "tours_pkey";

create policy "Enable read access for all users"
on "public"."tours"
as permissive
for select
to anon, authenticated
using (true);



