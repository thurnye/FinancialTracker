/**
 * Bot Detection & Device Fingerprinting
 */

import FingerprintJS from '@fingerprintjs/fingerprintjs';

class BotDetector {
  private fpPromise: Promise<any> | null = null;
  private fingerprint: { visitorId: string; confidence: number } | null = null;

  async initialize(): Promise<void> {
    if (!this.fpPromise) {
      this.fpPromise = FingerprintJS.load();
    }
    try {
      const fp = await this.fpPromise;
      const result = await fp.get();
      this.fingerprint = {
        visitorId: result.visitorId,
        confidence: result.confidence.score,
      };
    } catch (error) {
      console.error('Failed to initialize fingerprint:', error);
    }
  }

  getVisitorId(): string | null {
    return this.fingerprint?.visitorId || null;
  }

  getBotScore(): number {
    let score = 0;
    if (this.isSuspiciousBrowser()) score += 40;
    if (this.isAutomationDetected()) score += 30;
    if (this.fingerprint && this.fingerprint.confidence < 0.5) score += 20;
    return Math.min(100, score);
  }

  private isSuspiciousBrowser(): boolean {
    const checks = [
      'webdriver' in navigator && (navigator as any).webdriver,
      /HeadlessChrome/.test(navigator.userAgent),
      navigator.plugins.length === 0,
      window.screen.width === 0 || window.screen.height === 0,
    ];
    return checks.filter(Boolean).length >= 2;
  }

  private isAutomationDetected(): boolean {
    return [
      'webdriver' in navigator,
      (window as any)._selenium,
      (window as any).__nightmare,
      (window as any)._phantom,
    ].some(Boolean);
  }

  isLikelyBot(): boolean {
    return this.getBotScore() >= 50;
  }
}

export const botDetector = new BotDetector();

export const initializeBotDetection = async (): Promise<void> => {
  await botDetector.initialize();
};

export const getBotDetectionHeaders = (): Record<string, string> => ({
  'X-Device-Fingerprint': botDetector.getVisitorId() || 'unknown',
  'X-Bot-Score': botDetector.getBotScore().toString(),
});
