-- Table: contact_messages
CREATE TABLE contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Não Lido'
);

-- Table: pages_content
CREATE TABLE pages_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    page_identifier TEXT NOT NULL UNIQUE,
    title TEXT,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    structured_data JSONB,
    content_sections JSONB,
    user_id UUID REFERENCES auth.users(id)
);

-- Table: products
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    details JSONB,
    price NUMERIC,
    image_url TEXT,
    image_alt_text TEXT,
    category TEXT,
    is_published BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    structured_data JSONB,
    user_id UUID REFERENCES auth.users(id)
);

-- Table: quotes
CREATE TABLE quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT, -- Consider changing to FK to services.id if services table is created
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pendente'
);

-- Table: services
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    image_alt_text TEXT,
    category TEXT,
    is_published BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    structured_data JSONB,
    user_id UUID REFERENCES auth.users(id)
);
