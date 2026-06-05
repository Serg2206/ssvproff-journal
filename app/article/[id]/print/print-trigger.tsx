'use client'

import { useEffect } from 'react'

export default function PrintTrigger() {
  useEffect(() => {
    setTimeout(() => window.print(), 500)
  }, [])
  return null
}
