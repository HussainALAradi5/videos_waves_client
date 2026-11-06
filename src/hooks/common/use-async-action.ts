'use client'

import { useCallback, useRef, useState } from 'react'

/**
 * Runs an async action at most once at a time: while it is pending, further calls are ignored.
 * Buttons use it so a double click can never submit twice.
 */
export const useAsyncAction = <TArgs extends unknown[]>(action?: (...args: TArgs) => unknown) => {
  const [isPending, setIsPending] = useState(false)
  const isRunning = useRef(false)

  const run = useCallback(
    async (...args: TArgs) => {
      if (!action || isRunning.current) return
      isRunning.current = true
      setIsPending(true)
      try {
        await action(...args)
      } finally {
        isRunning.current = false
        setIsPending(false)
      }
    },
    [action]
  )

  return { run, isPending }
}
