alter table public.profiles
  add column if not exists student_ra text,
  add column if not exists cpf text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_student_ra_format'
  ) then
    alter table public.profiles
      add constraint profiles_student_ra_format
      check (student_ra is null or student_ra ~ '^[0-9]{7}-[0-9]$');
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_cpf_format'
  ) then
    alter table public.profiles
      add constraint profiles_cpf_format
      check (cpf is null or cpf ~ '^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$');
  end if;
end $$;

create unique index if not exists profiles_student_ra_unique
on public.profiles (student_ra)
where student_ra is not null;

create unique index if not exists profiles_cpf_unique
on public.profiles (cpf)
where cpf is not null;

create or replace function private.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, student_ra, cpf)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    'customer',
    nullif(new.raw_user_meta_data ->> 'student_ra', ''),
    nullif(new.raw_user_meta_data ->> 'cpf', '')
  )
  on conflict (id) do update
    set student_ra = coalesce(excluded.student_ra, public.profiles.student_ra),
        cpf = coalesce(excluded.cpf, public.profiles.cpf),
        updated_at = now();

  return new;
end;
$$;
