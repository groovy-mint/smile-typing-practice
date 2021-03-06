'use strict'

import { app, BrowserWindow, Menu, ipcMain, globalShortcut } from 'electron'
import '../renderer/store'
import Store from 'electron-store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */

/* eslint-disable no-new */

Menu.setApplicationMenu(null) // 프로그램 메뉴 삭제

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  if (process.platform !== 'darwin') {
    mainWindow = new BrowserWindow({
      height: 600,
      minHeight: 600,
      useContentSize: true,
      width: 800,
      minWidth: 900,
      frame: false,
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
        spellcheck: false
      }
    })
  } else {
    mainWindow = new BrowserWindow({
      height: 600,
      minHeight: 600,
      useContentSize: true,
      width: 900,
      minWidth: 900,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false,
        spellcheck: false
      }
    })
  }
  const schema = {
    language: {
      type: 'string',
      default: 'KO'
    },
    keyboard: {
      type: 'number',
      default: 0
    },
    cud: {
      type: 'boolean',
      default: false
    },
    keyMax: {
      type: 'integer',
      default: 50
    },
    wordMax: {
      type: 'integer',
      default: 50
    },
    wordCenter: {
      type: 'boolean',
      default: true
    },
    sentenceMax: {
      type: 'integer',
      default: 40
    },
    keyReports: {
      type: 'array',
      default: []
    },
    wordReports: {
      type: 'array',
      default: []
    },
    sentenceReports: {
      type: 'array',
      default: []
    },
    articleReports: {
      type: 'array',
      default: []
    }
  }

  const store = new Store({schema})

  ipcMain.handle('getStoreValue', (event, key) => {
    return store.get(key)
  })
  ipcMain.handle('setStoreValue', (event, key, value) => {
    return store.set(key, value)
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.whenReady().then(() => {
  globalShortcut.register('F5', () => {})
  globalShortcut.register('CommandOrControl+R', () => {})
  globalShortcut.register('CommandOrControl+Shift+R', () => {}) // 개발자가 매우 멍청해서 일단 코드 중복시킴, 단축키로 리로드 못하게 만듦
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
