# Discord Interactions Worker

A simple kickstart for [Discord Slash-commands (interactions)](https://discord.com/developers/docs/interactions/slash-commands) with [Cloudflare Workers](https://workers.cloudflare.com/)

### Setup

1. Make an application on [Discord's developer portal](https://discord.com/developers/applications)
2. Copy the public key as shown on the application page, and paste it in `index.js` under `const DISCORD_NACL_PUBLIC_KEY`
3. If you haven't already, install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)
4. Run `npm install`
5. [Login to Cloudflare](https://developers.cloudflare.com/workers/cli-wrangler/authentication), and set assosiated variables in `wrangler.toml`
6. Run `wrangler publish` once you're ready to upload your worker to Cloudflare
