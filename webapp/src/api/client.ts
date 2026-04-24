const BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000'

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

export const api = {
  articles: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : ''
      return request<{ data: Article[]; count: number }>(`/articles${qs}`)
    },
    get: (slug: string) => request<{ data: Article }>(`/articles/${slug}`),
    categories: () => request<{ data: Category[] }>('/articles/categories')
  }
}

export interface Article {
  id: string
  slug: string
  title: string
  category: string
  type: string
  description: string | null
  content: string
  tags: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  category: string
  count: number
}
