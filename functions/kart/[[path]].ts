/** /kart/<slug> — paylasilabilir hizmet veren karti. */
import { serveShell } from '../_shell';

export const onRequestGet: PagesFunction<{ ASSETS: Fetcher }> = ({ request, env }) =>
  serveShell(request, env);
