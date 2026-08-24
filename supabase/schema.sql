-- Guest book storage for the wedding invitation site.
-- Paste this whole file into the Supabase SQL Editor and run it. Running it
-- again is safe: every statement is idempotent.

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 60),
  message text not null check (char_length(trim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.wishes enable row level security;

-- Guests are anonymous, so the browser key may read and insert, nothing else.
grant select, insert on public.wishes to anon, authenticated;

drop policy if exists "wishes are readable by everyone" on public.wishes;
create policy "wishes are readable by everyone"
  on public.wishes for select
  using (true);

drop policy if exists "anyone can leave a wish" on public.wishes;
create policy "anyone can leave a wish"
  on public.wishes for insert
  with check (
    char_length(trim(name)) between 2 and 60
    and char_length(trim(message)) between 1 and 500
  );

-- Broadcast inserts to everyone who has the page open. Wrapped because the
-- SQL Editor runs this file in one transaction: a bare failure here would roll
-- back the table itself, and realtime is a nice-to-have, not a requirement.
do $$
begin
  alter publication supabase_realtime add table public.wishes;
exception
  when duplicate_object then null;
  when others then raise notice 'Realtime not enabled for wishes: %', sqlerrm;
end $$;

-- Verification: all three numbers should be 1, 2, 2.
select
  (select count(*) from pg_tables where schemaname = 'public' and tablename = 'wishes') as table_created,
  (select count(*) from pg_policies where schemaname = 'public' and tablename = 'wishes') as policies,
  (select count(*) from information_schema.role_table_grants
    where table_schema = 'public' and table_name = 'wishes' and grantee = 'anon') as anon_grants;
