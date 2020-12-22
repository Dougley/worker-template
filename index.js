const DISCORD_NACL_PUBLIC_KEY =
  'CHANGE ME'
const nacl = require('tweetnacl')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST')
    return new Response('Method not allowed', {
      status: 405,
    })
  const body = await request.text()
  const securityResponse = await checkSecurityHeaders(request, body)
  if (securityResponse && securityResponse instanceof Response)
    return securityResponse
  return respondToInteraction(JSON.parse(body))
}

async function checkSecurityHeaders(request, body) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(DISCORD_NACL_PUBLIC_KEY, 'hex'),
  )
  if (!verified)
    return new Response('Security header violation', {
      status: 403,
    })
}

async function respondToInteraction(request) {
  if (request.type === 1) return new Response(JSON.stringify({ type: 1 }))
  else {
    return new Response(
      JSON.stringify({
        type: 4,
        data: {
          content: 'Hello from Cloudflare Workers!',
        },
      }),
    )
  }
}
