import { getDefaultPaymentMethodsState } from '../data/defaultPaymentMethods';

const STORAGE_KEY = 'filtergo_portal_payment_methods_v2';

export function getStoredPaymentMethods() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultPaymentMethodsState();
    }
    const parsed = JSON.parse(raw);
    const methods = Array.isArray(parsed.methods) ? parsed.methods : [];
    return {
      methods,
      defaultMethodId: parsed.defaultMethodId ?? methods[0]?.id ?? null,
    };
  } catch {
    return getDefaultPaymentMethodsState();
  }
}

export function setStoredPaymentMethods(methods, defaultMethodId) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      methods,
      defaultMethodId,
    }),
  );
}
