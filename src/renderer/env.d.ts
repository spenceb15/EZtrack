/// <reference types="vite/client" />

import type { AppData } from './types'

declare global {
  interface Window {
    api: {
      platform: string
      loadData: () => Promise<unknown | null>
      saveData: (data: AppData) => Promise<boolean>
      dataPath: () => Promise<string>
    }
  }
}

export {}
