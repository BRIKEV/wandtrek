alter table "public"."coordinates" alter column "lat" set data type real using "lat"::real;

alter table "public"."coordinates" alter column "long" set data type real using "long"::real;

create policy "insert only tour owners"
on "public"."coordinates"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM tours
  WHERE ((tours.owner = auth.uid()) AND (tours.id = coordinates.tour_id)))));



