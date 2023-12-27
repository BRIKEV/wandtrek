alter table "public"."stops" alter column "image" drop not null;

alter table "public"."tours" add column "owner" uuid not null;

alter table "public"."tours" add constraint "tours_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."tours" validate constraint "tours_owner_fkey";

create policy "insert only owners of the tour"
on "public"."stops"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM tours
  WHERE ((tours.owner = auth.uid()) AND (tours.id = stops.tour_id)))));


create policy "Enable insert for users based on user_id"
on "public"."tours"
as permissive
for insert
to public
with check ((auth.uid() = owner));



