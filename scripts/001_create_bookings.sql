CREATE TABLE IF NOT EXISTS public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text,
  client_email text,
  client_phone text,
  drawing_files jsonb DEFAULT '[]'::jsonb,
  supporting_files jsonb DEFAULT '[]'::jsonb,
  show_measurements boolean DEFAULT true,
  walkthrough_plan jsonb DEFAULT '[]'::jsonb,
  location text DEFAULT 'Downtown Toronto East @ Illuminarium',
  requested_dates jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can update bookings" ON public.bookings FOR UPDATE USING (true);
