
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1a383716cced4c62bd6e0f6c86382d05',
  appName: 'galaxy-adviser-connect',
  webDir: 'dist',
  server: {
    url: 'https://1a383716-cced-4c62-bd6e-0f6c86382d05.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: "#1A1F2C",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
