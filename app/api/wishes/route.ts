import { NextResponse } from 'next/server'

const MAX_WISH_LENGTH = 1000

type WishRequest = {
  wish?: unknown
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

  if (!wish) {
    return NextResponse.json({ error: 'Please write a wish before sending.' }, { status: 400 })
  }

  if (wish.length > MAX_WISH_LENGTH) {
    return NextResponse.json({ error: `Wishes must be ${MAX_WISH_LENGTH} characters or fewer.` }, { status: 400 })
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `A wedding wish has arrived:\n\n${wish}`,
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
