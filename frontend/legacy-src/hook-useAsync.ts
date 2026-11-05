import { useCallback, useEffect, useState, type DependencyList } from 'react'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
}

/**
 * Small data-loading primitive. Public pages use it so loading, error and
 * empty states are handled the same way everywhere.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: DependencyList = []): AsyncState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)

    loader()
      .then((result) => {
        if (!active) return
        setData(result)
        setLoading(false)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setError(reason instanceof Error ? reason.message : 'Something went wrong. Please try again.')
        setLoading(false)
      })

    return () => {
      active = false
    }
    // The caller owns the dependency list; the loader is intentionally read
    // from the current render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, ...deps])

  return { data, loading, error, retry }
}
