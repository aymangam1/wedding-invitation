import { Countdown } from './components/Countdown'
import { EventDetails } from './components/EventDetails'
import { Footer } from './components/Footer'
// Gallery stays disabled until the couple photos are ready.
// import { Gallery } from './components/Gallery'
import { Guestbook } from './components/Guestbook'
import { Hero } from './components/Hero'
import { LanguageToggle } from './components/LanguageToggle'
import { MusicToggle } from './components/MusicToggle'
import { ShareInvite } from './components/ShareInvite'
import { Venue } from './components/Venue'

export default function App() {
  return (
    <>
      <LanguageToggle />
      <MusicToggle />

      <main>
        <Hero />
        <SectionSeparator />
        <Countdown />
        <EventDetails />
        <SectionSeparator />
        <Venue />
        {/* <Gallery /> */}
        <SectionSeparator />
        <Guestbook />
        <SectionSeparator />
        <ShareInvite />
      </main>

      <Footer />
    </>
  )
}

function SectionSeparator() {
  return (
    <div aria-hidden="true" className="section-shell">
      <div className="h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
    </div>
  )
}
