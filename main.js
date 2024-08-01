import { app, BrowserView } from "electron";
import { join } from "path";
import isDev from "electron-is-dev";
import next from "next";

const dev = isDev;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

let mainWindow;

nextApp.prepare().then(() => {
  app.on("ready", () => {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (false) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      mainWindow.loadURL(`file://${join(__dirname, ".next", "server")}`);
    }

    mainWindow.on("closed", () => {
      mainWindow = null;
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});
