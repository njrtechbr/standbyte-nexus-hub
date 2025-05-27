-- Add admin roles and permissions system

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'customer',
    granted_by UUID REFERENCES auth.users(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create admin_permissions table for granular permissions
CREATE TABLE public.admin_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create role_permissions junction table
CREATE TABLE public.role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(50) NOT NULL,
    permission_name VARCHAR(100) NOT NULL REFERENCES public.admin_permissions(permission_name) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(role, permission_name)
);

-- Insert default permissions
INSERT INTO public.admin_permissions (permission_name, description) VALUES
    ('view_dashboard', 'View admin dashboard'),
    ('manage_users', 'Create, edit, and delete users'),
    ('manage_products', 'Create, edit, and delete products'),
    ('manage_services', 'Create, edit, and delete services'),
    ('manage_orders', 'View and manage customer orders'),
    ('manage_quotes', 'View and manage service quotes'),
    ('view_analytics', 'View business analytics and reports'),
    ('manage_reviews', 'Moderate customer reviews'),
    ('manage_content', 'Edit website content and pages'),
    ('system_settings', 'Access system configuration');

-- Insert default roles and their permissions
-- Super Admin role (all permissions)
INSERT INTO public.role_permissions (role, permission_name)
SELECT 'super_admin', permission_name FROM public.admin_permissions;

-- Admin role (most permissions except system settings)
INSERT INTO public.role_permissions (role, permission_name)
SELECT 'admin', permission_name FROM public.admin_permissions 
WHERE permission_name != 'system_settings';

-- Manager role (limited permissions)
INSERT INTO public.role_permissions (role, permission_name) VALUES
    ('manager', 'view_dashboard'),
    ('manager', 'manage_orders'),
    ('manager', 'manage_quotes'),
    ('manager', 'view_analytics'),
    ('manager', 'manage_reviews');

-- Enable RLS on new tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Policies for user_roles table
CREATE POLICY "Users can view their own role" ON public.user_roles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Only admins can view all roles" ON public.user_roles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role IN ('super_admin', 'admin')
        )
    );

CREATE POLICY "Only super_admins can manage roles" ON public.user_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role = 'super_admin'
        )
    );

-- Policies for admin_permissions (read-only for admins)
CREATE POLICY "Admins can view permissions" ON public.admin_permissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role IN ('super_admin', 'admin', 'manager')
        )
    );

-- Policies for role_permissions (read-only for admins)
CREATE POLICY "Admins can view role permissions" ON public.role_permissions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.user_roles ur 
            WHERE ur.user_id = auth.uid() 
            AND ur.role IN ('super_admin', 'admin', 'manager')
        )
    );

-- Function to check if user has specific permission
CREATE OR REPLACE FUNCTION public.user_has_permission(user_id UUID, permission VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.user_roles ur
        JOIN public.role_permissions rp ON ur.role = rp.role
        WHERE ur.user_id = $1 AND rp.permission_name = $2
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.user_roles ur
        WHERE ur.user_id = COALESCE($1, auth.uid()) 
        AND ur.role IN ('super_admin', 'admin', 'manager')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID DEFAULT auth.uid())
RETURNS VARCHAR AS $$
DECLARE
    user_role VARCHAR;
BEGIN
    SELECT role INTO user_role
    FROM public.user_roles ur
    WHERE ur.user_id = COALESCE($1, auth.uid());
    
    RETURN COALESCE(user_role, 'customer');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create first super admin user (replace with your email)
-- You'll need to update this with your actual auth user ID after signing up
-- INSERT INTO public.user_roles (user_id, role, granted_by)
-- VALUES ('YOUR_AUTH_USER_ID_HERE', 'super_admin', 'YOUR_AUTH_USER_ID_HERE');

-- Add indexes for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_role_permissions_role ON public.role_permissions(role);
CREATE INDEX idx_role_permissions_permission ON public.role_permissions(permission_name);
