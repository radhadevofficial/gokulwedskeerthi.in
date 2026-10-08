'use client'

import { useState } from 'react'
import { CalendarDays, ChevronDown, Clock3, Heart, MapPin, Send, Sparkles } from 'lucide-react'

const photos = {
  portrait: '/images/hero-portrait.jpg',
  studio: '/images/story-studio.jpg',
  full: '/images/story-full.jpg',
  invitation: '/images/invitation.jpg',
}

const family = [
  { role: 'Groom’s family', name: 'With love from the Gokulakannan family', note: 'Parents, siblings & loved ones' },
  { role: 'Bride’s family', name: 'With blessings from the Keerthika family', note: 'Parents, siblings & loved ones' },
  { role: 'Our favourite people', name: 'Friends, colleagues & well-wishers', note: 'Your presence will make our day complete' },
]

export default function Page() {
  const [wish, setWish] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function sendWish() {
    const message = wish.trim()
    if (!message || sending) return

    setSending(true)
    setSent(false)
    setError('')

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wish: message }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'We could not send your wishes.')
      }

      setSent(true)
      setWish('')
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'We could not send your wishes.')
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="site-shell">
      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" />
        <nav className="top-nav" aria-label="Main navigation">
          <a className="monogram" href="#top">G <span>&</span> K</a>
          <div className="nav-links">
            <a href="#story">Our story</a>
            <a href="#details">Details</a>
            <a href="#wishes">Wishes</a>
          </div>
        </nav>
        <div className="hero-content">
          <p className="eyebrow light">A warm invitation to celebrate love</p>
          <p className="hero-kicker">Together with our families</p>
          <h1>Gokulakannan <span>&</span> Keerthika</h1>
          <p className="hero-date">Sunday · 25 October 2026</p>
          <a className="primary-button" href="#details">Join our celebration <ChevronDown size={16} /></a>
        </div>
        <div className="scroll-note"><span /> Scroll to explore</div>
      </section>

      <section className="welcome section-pad">
        <p className="eyebrow">With hearts full of joy</p>
        <h2>We are getting married</h2>
        <p className="intro-copy">We’re delighted to invite the people who have filled our lives with love, laughter and countless memories. Please join us as we begin our forever together.</p>
        <div className="floral-divider"><span>✦</span></div>
      </section>

      <section className="story section-pad" id="story">
        <div className="story-images">
          <img className="story-main" src={photos.studio} alt="Gokulakannan and Keerthika smiling together" />
          <img className="story-small" src={photos.full} alt="Gokulakannan and Keerthika together" />
          <div className="story-stamp"><Heart size={17} fill="currentColor" /><span>made<br />for each other</span></div>
        </div>
        <div className="story-copy">
          <p className="eyebrow">A little bit of our story</p>
          <h2>Two hearts,<br /><em>one beautiful beginning.</em></h2>
          <p>Some stories begin with a hello. Ours grew gently through little moments, shared smiles and a friendship that became something more. Today, we are grateful for the journey that brought us here — and excited for every chapter ahead.</p>
          <p className="signature">Gokulakannan <span>&</span> Keerthika</p>
        </div>
      </section>

      <section className="details-section section-pad" id="details">
        <div className="section-heading"><p className="eyebrow">Save the date</p><h2>Come celebrate with us</h2></div>
        <div className="details-grid">
          <div className="detail-card"><div className="detail-icon"><CalendarDays size={22} /></div><p className="detail-label">The day</p><h3>Sunday, 25 October<br />2026</h3><p>Reception to follow</p></div>
          <div className="detail-card featured"><div className="detail-icon"><Clock3 size={22} /></div><p className="detail-label">The time</p><h3>6:00 <span>in the morning</span></h3><p>Please arrive with your blessings</p></div>
          <div className="detail-card"><div className="detail-icon"><MapPin size={22} /></div><p className="detail-label">The place</p><h3>Assefa Marriage<br />Hall</h3><p>Kalligudi</p></div>
        </div>
        <a className="text-button" href="https://www.google.com/maps/search/Assefa+Marriage+Hall+Kalligudi" target="_blank" rel="noreferrer">Open venue in maps <MapPin size={15} /></a>
      </section>

      <section className="invitation-feature section-pad">
        <div className="invitation-copy"><Sparkles size={20} className="sparkle" /><p className="eyebrow">A keepsake for your heart</p><h2>Our invitation,<br /><em>made with love.</em></h2><p>We’ve shared the little details, but the most important part is you. Bring your warmest wishes and join us for a morning filled with joy.</p><a className="outline-button" href={photos.invitation} target="_blank" rel="noreferrer">View full invitation <span>↗</span></a></div>
        <div className="invitation-frame"><img src={photos.invitation} alt="Purple floral wedding invitation for Gokulakannan and Keerthika" /></div>
      </section>

      <section className="families section-pad"><div className="section-heading"><p className="eyebrow">Together with our families</p><h2>Happily inviting you</h2></div><div className="family-grid">{family.map((item) => <article className="family-card" key={item.role}><div className="family-dot"><Heart size={15} fill="currentColor" /></div><p className="detail-label">{item.role}</p><h3>{item.name}</h3><p>{item.note}</p></article>)}</div></section>

      <section className="wishes section-pad" id="wishes"><div className="wishes-inner"><Heart className="wishes-heart" size={26} fill="currentColor" /><p className="eyebrow light">Leave a little love</p><h2>Send us your wishes</h2><p>Your blessings mean the world to us. Write us a note to make our celebration even more special.</p><div className="wish-form"><label className="sr-only" htmlFor="wish">Your wishes</label><textarea id="wish" value={wish} maxLength={1000} onChange={(event) => { setWish(event.target.value); setSent(false); setError('') }} placeholder="Write your wishes here..." rows={3} disabled={sending} /><button type="button" onClick={sendWish} aria-label="Send your wishes" disabled={sending || !wish.trim()} aria-busy={sending}><Send size={17} /></button></div>{sending && <p className="wish-status">Sending your wishes with love...</p>}{sent && <p className="success-message">Your lovely wishes have been sent with love. Thank you!</p>}{error && <p className="error-message" role="alert">{error}</p>}</div></section>

      <footer><p className="monogram">G <span>&</span> K</p><p>With love, Gokulakannan & Keerthika</p><p className="footer-small">25 · 10 · 2026</p><p className="footer-credit">Crafted with care by <a href="https://radhadev.com" target="_blank" rel="noreferrer">Radhadev Solutions</a></p></footer>
    </main>
  )
}
