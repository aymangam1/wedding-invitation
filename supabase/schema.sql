-- Guest book storage for the wedding invitation site.
-- Paste this whole file into the Supabase SQL Editor and run it once.

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 60),
  message text not null check (char_length(trim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.wishes enable row level security;

-- Guests are anonymous, so the public anon key may read and insert, nothing else.
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

-- Broadcast inserts to everyone who has the page open.
alter publication supabase_realtime add table public.wishes;
