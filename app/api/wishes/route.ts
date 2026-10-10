import { NextResponse } from 'next/server'

const MAX_WISH_LENGTH = 1000

type WishRequest = {
  wish?: unknown
  senderName?: unknown
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'Wishes are temporarily unavailable.' }, { status: 503 })
  }

  let body: WishRequest

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please send a valid wish.' }, { status: 400 })
  }

  const wish = typeof body.wish === 'string' ? body.wish.trim() : ''
  const senderName = typeof body.senderName === 'string' ? body.senderName.trim() : ''

  if (!wish) {
    return NextResponse.json({ error: 'Please write a wish before sending.' }, { status: 400 })
  }

  if (wish.length > MAX_WISH_LENGTH) {
    return NextResponse.json({ error: `Wishes must be ${MAX_WISH_LENGTH} characters or fewer.` }, { status: 400 })
  }

  if (!senderName) {
    return NextResponse.json({ error: 'Please tell us your name before sending.' }, { status: 400 })
  }

  if (senderName.length > 100) {
    return NextResponse.json({ error: 'Names must be 100 characters or fewer.' }, { status: 400 })
  }

  const forwardedIp = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'Unavailable'
  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata',
  })

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `A wedding wish has arrived:\n\nFrom: ${senderName}\nWish: ${wish}\n\nIP: ${forwardedIp}\nTime (IST): ${timestamp}`,
      }),
    })

    if (!telegramResponse.ok) {
      return NextResponse.json({ error: 'We could not deliver your wish right now.' }, { status: 502 })
    }

    return NextResponse.json({ sent: true })
  } catch {
    return NextResponse.json({ error: 'We could not deliver your wish right now.' }, { status: 502 })
  }
}
