alter table "public"."profiles" alter column "id" drop default;

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, first_name, last_name, email, type)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', new.email, new.raw_user_meta_data ->> 'type');
  return new;
end;
$function$
;

create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));



