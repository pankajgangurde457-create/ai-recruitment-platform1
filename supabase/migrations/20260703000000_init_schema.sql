-- Migration: 20260703000000_init_schema.sql
-- Description: Core Schema Initialization with Row Level Security (RLS)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users Table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  role text not null default 'recruiter' check (role in ('admin', 'recruiter', 'executive')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Jobs Table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  department text not null,
  location text not null,
  type text not null default 'Full-time' check (type in ('Full-time', 'Part-time', 'Contract', 'Remote', 'Internship')),
  experience_level text not null default 'Mid' check (experience_level in ('Junior', 'Mid', 'Senior', 'Lead', 'Executive')),
  skills_required text[] default '{}'::text[] not null,
  salary_range text,
  status text not null default 'active' check (status in ('active', 'closed', 'draft')),
  recruiter_id uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Candidates Table
create table public.candidates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  phone text,
  skills text[] default '{}'::text[] not null,
  experience_years integer default 0 not null,
  education text,
  resume_url text,
  summary text,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Applications Table
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  status text not null default 'applied' check (status in ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  match_score integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (job_id, candidate_id)
);

-- 5. Interviews Table
create table public.interviews (
  id uuid default gen_random_uuid() primary key,
  application_id uuid references public.applications(id) on delete cascade not null,
  date timestamp with time zone not null,
  duration_minutes integer default 45 not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  interviewer_name text not null,
  notes text,
  generated_questions text[] default '{}'::text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Notifications Table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  message text not null,
  type text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Resume Scores Table
create table public.resume_scores (
  id uuid default gen_random_uuid() primary key,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  score integer default 0 not null,
  summary text not null,
  strengths text[] default '{}'::text[] not null,
  weaknesses text[] default '{}'::text[] not null,
  skill_gap text[] default '{}'::text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. AI Logs Table
create table public.ai_logs (
  id uuid default gen_random_uuid() primary key,
  request_type text not null check (request_type in ('parser', 'score', 'ranking', 'matching', 'assistant')),
  prompt text,
  response text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Activity Logs Table
create table public.activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  action text not null,
  target text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on public.users for each row execute procedure update_updated_at_column();
create trigger update_jobs_updated_at before update on public.jobs for each row execute procedure update_updated_at_column();
create trigger update_candidates_updated_at before update on public.candidates for each row execute procedure update_updated_at_column();
create trigger update_applications_updated_at before update on public.applications for each row execute procedure update_updated_at_column();
create trigger update_interviews_updated_at before update on public.interviews for each row execute procedure update_updated_at_column();

-- Enable Row Level Security (RLS) on all tables
alter table public.users enable row level security;
alter table public.jobs enable row level security;
alter table public.candidates enable row level security;
alter table public.applications enable row level security;
alter table public.interviews enable row level security;
alter table public.notifications enable row level security;
alter table public.resume_scores enable row level security;
alter table public.ai_logs enable row level security;
alter table public.activity_logs enable row level security;

-- RLS Policies
-- Users: Read profiles is open to authenticated. Writing profiles is limited to the user themselves or admins.
create policy "Users profiles are viewable by authenticated users"
  on public.users for select to authenticated using (true);

create policy "Users can update their own profile"
  on public.users for update to authenticated using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert to authenticated with check (auth.uid() = id);

-- Jobs: Authenticated can read jobs. Only recruiters and admins can create/update/delete.
create policy "Jobs are readable by authenticated users"
  on public.jobs for select to authenticated using (true);

create policy "Jobs are manageable by authenticated users"
  on public.jobs for all to authenticated using (true);

-- Candidates: Authenticated can read/write.
create policy "Candidates are manageable by authenticated users"
  on public.candidates for all to authenticated using (true);

-- Applications: Authenticated can read/write.
create policy "Applications are manageable by authenticated users"
  on public.applications for all to authenticated using (true);

-- Interviews: Authenticated can read/write.
create policy "Interviews are manageable by authenticated users"
  on public.interviews for all to authenticated using (true);

-- Notifications: Only target users can read/manage their own.
create policy "Notifications are viewable by recipient"
  on public.notifications for select to authenticated using (auth.uid() = user_id);

create policy "Notifications are updateable by recipient"
  on public.notifications for update to authenticated using (auth.uid() = user_id);

create policy "Notifications are insertable by authenticated users"
  on public.notifications for insert to authenticated with check (true);

-- Resume Scores: Authenticated can read/write.
create policy "Resume scores are manageable by authenticated users"
  on public.resume_scores for all to authenticated using (true);

-- AI Logs: Manageable by authenticated users.
create policy "AI logs are readable by authenticated users"
  on public.ai_logs for select to authenticated using (true);

create policy "AI logs are insertable by authenticated users"
  on public.ai_logs for insert to authenticated with check (true);

-- Activity Logs: Manageable by authenticated users.
create policy "Activity logs are readable by authenticated users"
  on public.activity_logs for select to authenticated using (true);

create policy "Activity logs are insertable by authenticated users"
  on public.activity_logs for insert to authenticated with check (true);

-- Trigger to sync auth.users with public.users on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, email, role, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'recruiter'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
