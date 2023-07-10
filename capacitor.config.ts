import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'brain-eq',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
