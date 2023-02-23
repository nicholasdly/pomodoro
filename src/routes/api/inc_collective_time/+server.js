 
import { supabase } from "$lib/server/database";

export async function GET() {
    await supabase.rpc('increment', { id: 'total_seconds' });
    return new Response();
}