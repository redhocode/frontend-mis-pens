import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'frontend-mis-pens',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  bundledWebRuntime: false,

};

export default config;
