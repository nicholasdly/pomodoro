 
import { supabase } from "$lib/server/database";

export async function GET() {
    const response = await supabase
        .from('metrics')
        .select('value')
        .match({ id: 'total_seconds' })
        .single();
    return new Response(response.data.value);
}