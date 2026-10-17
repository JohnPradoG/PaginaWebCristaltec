import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas de extremo a extremo sobre el sitio exportado (carpeta out/).
 * Ejecutar: npm run build && npm test
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    // Opcional: ruta a un Chromium ya instalado (PLAYWRIGHT_CHROMIUM_PATH).
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1 --directory out",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
    { name: "movil", use: { ...devices["Pixel 7"] } },
  ],
});
