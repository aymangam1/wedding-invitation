import { supabase } from './supabase'

export const NAME_MAX = 60
export const MESSAGE_MAX = 500

export type Wish = {
  id: string
  name: string
  message: string
  created_at: string
}

const TABLE = 'wishes'
const LOCAL_KEY = 'wedding:wishes'

function readLocal(): Wish[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Wish[]) : []
  } catch {
    return []
  }
}

function writeLocal(wishes: Wish[]): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(wishes))
  } catch {
    // Storage may be unavailable; the wish still shows for this session.
  }
}

export async function fetchWishes(): Promise<Wish[]> {
  if (!supabase) return readLocal()

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(300)

  if (error) throw error
  return (data ?? []) as Wish[]
}

export async function addWish(input: { name: string; message: string }): Promise<Wish> {
  const name = input.name.trim().slice(0, NAME_MAX)
  const message = input.message.trim().slice(0, MESSAGE_MAX)

  if (!supabase) {
    const wish: Wish = {
      id: `local-${Date.now()}`,
      name,
      message,
      created_at: new Date().toISOString(),
    }
    writeLocal([wish, ...readLocal()])
    return wish
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({ name, message })
    .select('id, name, message, created_at')
    .single()

  if (error) throw error
  return data as Wish
}

type WishEvents = {
  onInsert: (wish: Wish) => void
  /** Fires when a wish is removed in the dashboard, so open pages drop it too. */
  onDelete: (id: string) => void
}

/** Streams wish changes to every open page; returns a cleanup function. */
export function subscribeToWishes({ onInsert, onDelete }: WishEvents): () => void {
  const client = supabase
  if (!client) return () => undefined

  const channel = client
    .channel('public:wishes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: TABLE },
      (payload) => onInsert(payload.new as Wish),
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: TABLE },
      // Delete payloads only carry the primary key unless replica identity is full.
      (payload) => {
        const id = (payload.old as Partial<Wish>).id
        if (id) onDelete(id)
      },
    )
    .subscribe()

  return () => {
    void client.removeChannel(channel)
  }
}
