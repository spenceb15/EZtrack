import { contextBridge, ipcRenderer } from 'electron'
import type { AppData } from '../renderer/types'

// Safe bridge over IPC for local JSON persistence.
const api = {
  platform: process.platform,
  loadData: (): Promise<unknown | null> => ipcRenderer.invoke('data:load'),
  saveData: (data: AppData): Promise<boolean> => ipcRenderer.invoke('data:save', data),
  dataPath: (): Promise<string> => ipcRenderer.invoke('data:path'),
  exportFile: (content: string, defaultName: string): Promise<boolean> =>
    ipcRenderer.invoke('file:export', { content, defaultName })
}

contextBridge.exposeInMainWorld('api', api)
