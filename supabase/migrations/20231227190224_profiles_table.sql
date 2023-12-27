create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "type" text not null
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

create policy "Enable read access for all users"
on "public"."profiles"
as permissive
for select
to public
using (true);
