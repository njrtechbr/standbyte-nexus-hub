-- Create services table
create table if not exists public.services (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null,
    category text not null,
    price_type text not null check (price_type in ('fixed', 'hourly', 'quote')),
    base_price decimal(10,2),
    duration_hours integer,
    is_active boolean default true,
    specifications jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create quote_requests table
create table if not exists public.quote_requests (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete set null,
    service_id uuid references public.services(id) on delete set null,
    name text not null,
    email text not null,
    phone text,
    company text,
    project_title text not null,
    project_description text not null,
    requirements jsonb,
    budget_range text,
    timeline text,
    status text not null default 'pending' check (status in ('pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired')),
    quoted_amount decimal(10,2),
    quote_details jsonb,
    quoted_at timestamp with time zone,
    expires_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index if not exists services_category_idx on public.services(category);
create index if not exists services_is_active_idx on public.services(is_active);
create index if not exists services_price_type_idx on public.services(price_type);

create index if not exists quote_requests_user_id_idx on public.quote_requests(user_id);
create index if not exists quote_requests_service_id_idx on public.quote_requests(service_id);
create index if not exists quote_requests_status_idx on public.quote_requests(status);
create index if not exists quote_requests_created_at_idx on public.quote_requests(created_at);

-- Enable RLS on services table
alter table public.services enable row level security;

-- RLS policies for services
create policy "Services are viewable by everyone" on public.services
    for select using (true);

create policy "Only admins can insert services" on public.services
    for insert with check (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_services'
        )
    );

create policy "Only admins can update services" on public.services
    for update using (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_services'
        )
    );

create policy "Only admins can delete services" on public.services
    for delete using (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_services'
        )
    );

-- Enable RLS on quote_requests table
alter table public.quote_requests enable row level security;

-- RLS policies for quote_requests
create policy "Users can view their own quote requests" on public.quote_requests
    for select using (auth.uid() = user_id);

create policy "Admins can view all quote requests" on public.quote_requests
    for select using (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_quotes'
        )
    );

create policy "Users can insert their own quote requests" on public.quote_requests
    for insert with check (auth.uid() = user_id);

create policy "Anyone can insert quote requests without user_id" on public.quote_requests
    for insert with check (user_id is null);

create policy "Only admins can update quote requests" on public.quote_requests
    for update using (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_quotes'
        )
    );

create policy "Only admins can delete quote requests" on public.quote_requests
    for delete using (
        exists (
            select 1 from public.user_roles ur
            join public.admin_permissions ap on ur.role_id = ap.role_id
            where ur.user_id = auth.uid()
            and ap.permission_name = 'manage_quotes'
        )
    );

-- Add missing admin permissions for new features
insert into public.admin_permissions (role_id, permission_name) 
select id, 'manage_services' from public.admin_roles where name = 'super_admin'
on conflict (role_id, permission_name) do nothing;

insert into public.admin_permissions (role_id, permission_name) 
select id, 'manage_quotes' from public.admin_roles where name = 'super_admin'
on conflict (role_id, permission_name) do nothing;

insert into public.admin_permissions (role_id, permission_name) 
select id, 'view_analytics' from public.admin_roles where name = 'super_admin'
on conflict (role_id, permission_name) do nothing;

insert into public.admin_permissions (role_id, permission_name) 
select id, 'manage_settings' from public.admin_roles where name = 'super_admin'
on conflict (role_id, permission_name) do nothing;

-- Add permissions for admin role too
insert into public.admin_permissions (role_id, permission_name) 
select id, 'manage_services' from public.admin_roles where name = 'admin'
on conflict (role_id, permission_name) do nothing;

insert into public.admin_permissions (role_id, permission_name) 
select id, 'manage_quotes' from public.admin_roles where name = 'admin'
on conflict (role_id, permission_name) do nothing;

insert into public.admin_permissions (role_id, permission_name) 
select id, 'view_analytics' from public.admin_roles where name = 'admin'
on conflict (role_id, permission_name) do nothing;

-- Add some sample services
insert into public.services (name, description, category, price_type, base_price, duration_hours, specifications) values
('Website Development', 'Custom website development with modern technologies', 'web-development', 'quote', null, null, '{"technologies": ["React", "TypeScript", "Tailwind CSS"], "features": ["Responsive Design", "SEO Optimization", "Performance Optimization"]}'),
('Mobile App Development', 'Native and cross-platform mobile application development', 'mobile-development', 'quote', null, null, '{"platforms": ["iOS", "Android", "React Native"], "features": ["Push Notifications", "Offline Support", "User Authentication"]}'),
('Technical Consultation', 'Expert technical advice and architecture planning', 'consulting', 'hourly', 150.00, 1, '{"expertise": ["Architecture Design", "Technology Selection", "Performance Optimization"], "deliverables": ["Technical Documentation", "Recommendations Report"]}'),
('Code Review Service', 'Professional code review and quality assessment', 'consulting', 'fixed', 500.00, 8, '{"languages": ["JavaScript", "TypeScript", "Python", "React"], "deliverables": ["Detailed Report", "Improvement Suggestions", "Best Practices Guide"]}'),
('Website Maintenance', 'Ongoing website maintenance and updates', 'maintenance', 'fixed', 299.00, null, '{"includes": ["Security Updates", "Content Updates", "Performance Monitoring", "Monthly Reports"], "frequency": "Monthly"}}')
on conflict do nothing;
