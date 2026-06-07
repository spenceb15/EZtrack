import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { basename, join } from 'path'

// Prevent Chromium from prompting for macOS Keychain access.
// This app stores nothing sensitive — session data doesn't need OS-level encryption.
app.commandLine.appendSwitch('password-store', 'basic')
app.commandLine.appendSwitch('use-mock-keychain')
import { homedir } from 'os'
import { promises as fs } from 'fs'
import { randomUUID } from 'crypto'

// Local-first storage: a single JSON file under the user's home folder.
// Path is fixed in main (never taken from the renderer) so there is no path traversal.
const DATA_DIR = join(homedir(), 'AIProjectDashboard')
const DATA_FILE = join(DATA_DIR, 'app-data.json')

async function loadData(): Promise<unknown | null> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw err
  }
}

async function saveData(data: unknown): Promise<boolean> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const temporaryFile = `${DATA_FILE}.${randomUUID()}.tmp`

  try {
    await fs.writeFile(temporaryFile, JSON.stringify(data, null, 2), 'utf-8')
    await fs.rename(temporaryFile, DATA_FILE)
    return true
  } finally {
    await fs.rm(temporaryFile, { force: true })
  }
}

async function exportFile(content: string, defaultName: string): Promise<boolean> {
  const win = BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0]
  const result = await dialog.showSaveDialog(win, {
    // basename strips any path components so the renderer can't steer the
    // default location outside the home folder (defense-in-depth; the user
    // still confirms the final path in the dialog).
    defaultPath: join(homedir(), basename(defaultName)),
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })
  if (result.canceled || !result.filePath) return false
  await fs.writeFile(result.filePath, content, 'utf-8')
  return true
}

function registerIpc(): void {
  ipcMain.handle('data:load', () => loadData())
  ipcMain.handle('data:save', (_event, data: unknown) => saveData(data))
  ipcMain.handle('data:path', () => DATA_FILE)
  ipcMain.handle('file:export', (_event, { content, defaultName }: { content: string; defaultName: string }) =>
    exportFile(content, defaultName)
  )
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 832,
    minWidth: 960,
    minHeight: 640,
    show: false,
    backgroundColor: '#0e1116',
    title: 'AI Project Dashboard',
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  win.on('ready-to-show', () => win.show())

  // Block in-page navigation away from the app's own content. setWindowOpenHandler
  // covers window.open; this covers link clicks / location changes to remote origins.
  win.webContents.on('will-navigate', (event, url) => {
    const allowed = process.env['ELECTRON_RENDERER_URL']
    if (!allowed || !url.startsWith(allowed)) event.preventDefault()
  })

  // Open external links in the system browser, never in-app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    // Deny by default; only hand off well-formed http(s) URLs to the OS browser.
    // A malformed URL throws in the URL constructor — swallow it and still deny.
    try {
      const protocol = new URL(url).protocol
      if (protocol === 'https:' || protocol === 'http:') {
        void shell.openExternal(url)
      }
    } catch {
      // Ignore unparseable URLs.
    }
    return { action: 'deny' }
  })

  // electron-vite injects ELECTRON_RENDERER_URL in dev; load the file in prod.
  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  registerIpc()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
