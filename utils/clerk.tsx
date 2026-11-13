'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ClerkInitStatus = 'unconfigured' | 'checking' | 'configured' | 'invalid_format' | 'error';
export type KeySource = 'next_env' | 'localStorage' | 'manual' | 'none';

export interface ClerkVerificationDetails {
  status: ClerkInitStatus;
  isLoaded: boolean;
  isConfigured: boolean;
  rawEnvFound: boolean;
  publishableKey: string;
  maskedKey: string;
  keySource: KeySource;
  prefixValid: boolean;
  formatValid: boolean;
  detectedLength: number;
  errorMessage: string | null;
  verifiedAt: string;
}

export interface ClerkContextValue {
  isClerkConfigured: boolean;
  clerkPublishableKey: string;
  maskedKey: string;
  initStatus: ClerkInitStatus;
  verificationDetails: ClerkVerificationDetails;
  setManualKey: (key: string) => void;
  reverifyKey: () => Promise<ClerkVerificationDetails>;
  clearKey: () => void;
  logDiagnosticReport: () => void;
  signOutClerk?: () => Promise<void>;
  openClerkSignIn?: () => void;
  openClerkSignUp?: () => void;
}

export const sanitizeClerkKey = (raw: unknown): string => {
  if (typeof raw !== 'string') return '';
  return raw.trim().replace(/^["'`]|["'`]$/g, '').trim();
};

export const maskClerkKey = (key: string): string => {
  if (!key) return '(none)';
  if (key.length <= 12) return `${key.substring(0, 4)}••••`;
  const prefix = key.substring(0, 8);
  const suffix = key.slice(-4);
  return `${prefix}••••••••${suffix}`;
};

export const verifyClerkKey = (rawKey: string, source: KeySource): ClerkVerificationDetails => {
  const cleanKey = sanitizeClerkKey(rawKey);
  const rawEnvKey = sanitizeClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '');

  if (!cleanKey) {
    return {
      status: 'unconfigured',
      isLoaded: true,
      isConfigured: false,
      rawEnvFound: Boolean(rawEnvKey),
      publishableKey: '',
      maskedKey: '(none)',
      keySource: 'none',
      prefixValid: false,
      formatValid: false,
      detectedLength: 0,
      errorMessage: 'No Publishable Key detected in NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY or storage.',
      verifiedAt: new Date().toLocaleTimeString(),
    };
  }

  if (cleanKey.startsWith('sk_') || cleanKey.startsWith('sk_test_') || cleanKey.startsWith('sk_live_')) {
    return {
      status: 'invalid_format',
      isLoaded: true,
      isConfigured: false,
      rawEnvFound: Boolean(rawEnvKey),
      publishableKey: cleanKey,
      maskedKey: maskClerkKey(cleanKey),
      keySource: source,
      prefixValid: false,
      formatValid: false,
      detectedLength: cleanKey.length,
      errorMessage: 'Secret Key detected. Please provide your Publishable Key (starts with pk_test_ or pk_live_).',
      verifiedAt: new Date().toLocaleTimeString(),
    };
  }

  const isValidPrefix = cleanKey.startsWith('pk_test_') || cleanKey.startsWith('pk_live_');

  return {
    status: isValidPrefix ? 'configured' : 'error',
    isLoaded: true,
    isConfigured: isValidPrefix,
    rawEnvFound: Boolean(rawEnvKey),
    publishableKey: cleanKey,
    maskedKey: maskClerkKey(cleanKey),
    keySource: source,
    prefixValid: isValidPrefix,
    formatValid: isValidPrefix && cleanKey.length > 20,
    detectedLength: cleanKey.length,
    errorMessage: isValidPrefix ? null : 'Key does not begin with pk_test_ or pk_live_.',
    verifiedAt: new Date().toLocaleTimeString(),
  };
};

const ClerkCustomContext = createContext<ClerkContextValue>({
  isClerkConfigured: false,
  clerkPublishableKey: '',
  maskedKey: '(none)',
  initStatus: 'unconfigured',
  verificationDetails: {
    status: 'unconfigured',
    isLoaded: false,
    isConfigured: false,
    rawEnvFound: false,
    publishableKey: '',
    maskedKey: '(none)',
    keySource: 'none',
    prefixValid: false,
    formatValid: false,
    detectedLength: 0,
    errorMessage: null,
    verifiedAt: '',
  },
  setManualKey: () => {},
  reverifyKey: async () => ({} as any),
  clearKey: () => {},
  logDiagnosticReport: () => {},
});

export const AppClerkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clerkKey, setClerkKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('apex_clerk_publishable_key');
      if (stored) return sanitizeClerkKey(stored);
    }
    return sanitizeClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '');
  });

  const [verification, setVerification] = useState<ClerkVerificationDetails>(() =>
    verifyClerkKey(clerkKey, 'next_env')
  );

  const reverifyKey = useCallback(async (): Promise<ClerkVerificationDetails> => {
    const verified = verifyClerkKey(clerkKey, 'manual');
    setVerification(verified);
    return verified;
  }, [clerkKey]);

  const setManualKey = useCallback((newKey: string) => {
    const sanitized = sanitizeClerkKey(newKey);
    setClerkKey(sanitized);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('apex_clerk_publishable_key', sanitized);
      } catch {}
    }
    setVerification(verifyClerkKey(sanitized, 'manual'));
  }, []);

  const clearKey = useCallback(() => {
    setClerkKey('');
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('apex_clerk_publishable_key');
      } catch {}
    }
    setVerification(verifyClerkKey('', 'none'));
  }, []);

  const logDiagnosticReport = useCallback(() => {
    console.info('--- Clerk Diagnostic Report ---', verification);
  }, [verification]);

  const contextValue: ClerkContextValue = {
    isClerkConfigured: verification.isConfigured,
    clerkPublishableKey: clerkKey,
    maskedKey: maskClerkKey(clerkKey),
    initStatus: verification.status,
    verificationDetails: verification,
    setManualKey,
    reverifyKey,
    clearKey,
    logDiagnosticReport,
  };

  return (
    <ClerkCustomContext.Provider value={contextValue}>
      {children}
    </ClerkCustomContext.Provider>
  );
};

export const useClerkConfig = () => useContext(ClerkCustomContext);