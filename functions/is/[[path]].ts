/** /is/<publicId> — hizmet verenlere gosterilen ilan sayfasi. */
import { serveShell } from '../_shell';

export const onRequestGet: PagesFunction<{ ASSETS: Fetcher }> = ({ request, env }) =>
  serveShell(request, env);
