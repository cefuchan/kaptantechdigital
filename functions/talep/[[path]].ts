/** /talep/<ownerToken> — talep sahibinin teklif paneli. */
import { serveShell } from '../_shell';

export const onRequestGet: PagesFunction<{ ASSETS: Fetcher }> = ({ request, env }) =>
  serveShell(request, env);
