# rag_application_mistral_nonlocal

Sandbox for an LLM finetuned with RAG, 
the model is mistral accessed online, 
frontend Next.js with deployement on vercel


Note:

In Supabase:
Enable the pgvector extension:
    • Navigate to the Supabase dashboard.
    • Go to the Database section.
    • Select Extensions from the sidebar.
    • Search for "vector" and enable the pgvector extension.
    • Specify the vector dimension:
    • Once the pgvector extension is enabled, you need to specify the dimension of your vectors. This is typically done using the vector(dimension) syntax. For example, if your vectors are 128-dimensional:
SQL
create table documents (
  id uuid primary key default uuid_generate_v4(),
  content text,
  vector vector(128)
); 

Create locally 	npx app:
npx create-next-app rag-application 

and add dependencies: yarn add @supabase/supabase-js axios

in lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

create .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_KEY=your-supabase-key

add axion:
yarn add axios
