alter table public.profiles
  drop constraint if exists profiles_student_ra_format;

alter table public.profiles
  add constraint profiles_student_ra_format
  check (student_ra is null or student_ra ~ '^[0-9]{8}-[0-9]$')
  not valid;

do $$
begin
  if not exists (
    select 1
    from public.profiles
    where student_ra is not null
      and student_ra !~ '^[0-9]{8}-[0-9]$'
  ) then
    alter table public.profiles
      validate constraint profiles_student_ra_format;
  end if;
end $$;
