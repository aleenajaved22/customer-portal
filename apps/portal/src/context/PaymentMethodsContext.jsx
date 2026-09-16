import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { buildPaymentMethodSummary } from '../data/paymentMethodCategories';
import { getStoredPaymentMethods, setStoredPaymentMethods } from '../auth/paymentMethodsStorage';

const PaymentMethodsContext = createContext(null);

function createMethodId() {
  return `pm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function PaymentMethodsProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = getStoredPaymentMethods();
    try {
      const raw = localStorage.getItem('filtergo_portal_payment_methods_v1');
      if (!raw) {
        setStoredPaymentMethods(stored.methods, stored.defaultMethodId);
      } else {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed.methods) || parsed.methods.length === 0) {
          setStoredPaymentMethods(stored.methods, stored.defaultMethodId);
        }
      }
    } catch {
      setStoredPaymentMethods(stored.methods, stored.defaultMethodId);
    }
    return stored;
  });

  const persist = useCallback((next) => {
    setState(next);
    setStoredPaymentMethods(next.methods, next.defaultMethodId);
  }, []);

  const defaultMethod = useMemo(
    () => state.methods.find((method) => method.id === state.defaultMethodId) ?? state.methods[0] ?? null,
    [state.defaultMethodId, state.methods],
  );

  const addPaymentMethod = useCallback(
    (typeId, details = {}, options = {}) => {
      const summary = buildPaymentMethodSummary(typeId, details);
      const method = {
        id: createMethodId(),
        typeId,
        details,
        label: summary.label,
        subtitle: summary.subtitle,
        createdAt: new Date().toISOString(),
      };
      const methods = [...state.methods, method];
      const defaultMethodId = options.makeDefault !== false ? method.id : state.defaultMethodId ?? method.id;
      persist({ methods, defaultMethodId });
      return method;
    },
    [persist, state.defaultMethodId, state.methods],
  );

  const setDefaultPaymentMethod = useCallback(
    (methodId) => {
      if (!state.methods.some((method) => method.id === methodId)) return;
      persist({ ...state, defaultMethodId: methodId });
    },
    [persist, state],
  );

  const removePaymentMethod = useCallback(
    (methodId) => {
      const methods = state.methods.filter((method) => method.id !== methodId);
      const defaultMethodId =
        state.defaultMethodId === methodId ? methods[0]?.id ?? null : state.defaultMethodId;
      persist({ methods, defaultMethodId });
    },
    [persist, state],
  );

  const value = useMemo(
    () => ({
      methods: state.methods,
      defaultMethod,
      defaultMethodId: state.defaultMethodId,
      hasPaymentMethod: Boolean(defaultMethod),
      addPaymentMethod,
      setDefaultPaymentMethod,
      removePaymentMethod,
    }),
    [addPaymentMethod, defaultMethod, removePaymentMethod, setDefaultPaymentMethod, state.defaultMethodId, state.methods],
  );

  return <PaymentMethodsContext.Provider value={value}>{children}</PaymentMethodsContext.Provider>;
}

export function usePaymentMethods() {
  const ctx = useContext(PaymentMethodsContext);
  if (!ctx) {
    throw new Error('usePaymentMethods must be used within PaymentMethodsProvider');
  }
  return ctx;
}
