create table if not exists public.users (
  id         uuid references auth.users(id) on delete cascade primary key,
  name       text        not null default '',
  email      text        not null,
  plan       text        not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "users: self-read"
  on public.users for select
  using (auth.uid() = id);

create policy "users: self-update"
  on public.users for update
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.users (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
