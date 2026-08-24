/**
 * Single source of truth for every wedding detail shown on the page.
 * Change values here and the whole site follows.
 */

export const wedding = {
  groom: { ar: 'Ayman', en: 'Ayman' },
  bride: { ar: 'Menna', en: 'Menna' },

  /** Party start, in Cairo time (UTC+3 during September). */
  startsAt: '2026-09-17T19:00:00+03:00',
  /** Party end — midnight the same night. */
  endsAt: '2026-09-18T00:00:00+03:00',

  venue: {
    name: { ar: 'قاعة فيلورا', en: 'Fillora Hall' },
    address: {
      ar: 'حديقة الحلمية، 147 شارع المشد، النزهة، منشية التحرير، عين شمس، القاهرة',
      en: 'Helmeya Garden, 147 El-Meshed St., El-Nozha, Mansheya El-Tahrir, Ain Shams, Cairo',
    },
    mapsUrl: 'https://maps.app.goo.gl/uX8bchXfKja9DVVh8',
    /** Keyless Google Maps embed driven by the venue query. */
    embedQuery: 'حديقة الحلمية 147 المشد النزهة عين شمس القاهرة',
  },

  music: {
    src: '/assets/music/song.mp3',
    /** Shown under the music button so guests know what is playing. */
    title: { ar: 'موسيقى الفرح', en: 'Wedding Music' },
  },

  gallery: [
    '/assets/images/couple-1.jpg',
    '/assets/images/couple-2.jpg',
    '/assets/images/couple-3.jpg',
    '/assets/images/couple-4.jpg',
  ],

  heroImage: '/assets/images/hero.jpg',
} as const

export function mapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(wedding.venue.embedQuery)}&z=16&output=embed`
}

/** Google Calendar wants UTC timestamps in the YYYYMMDDTHHMMSSZ shape. */
function toCalendarStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function calendarUrl(lang: 'ar' | 'en'): string {
  const title =
    lang === 'ar'
      ? `فرح ${wedding.groom.ar} و ${wedding.bride.ar}`
      : `${wedding.groom.en} & ${wedding.bride.en} Wedding`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalendarStamp(wedding.startsAt)}/${toCalendarStamp(wedding.endsAt)}`,
    location: `${wedding.venue.name[lang]} — ${wedding.venue.address[lang]}`,
    details: wedding.venue.mapsUrl,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
