import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { buildPaymentMethodSummary } from '../data/paymentMethodCategories';
import { COMPANION_PAYMENT_METHOD_SEEDS } from '../data/companionPaymentMethods';
import { getStoredPaymentMethods, setStoredPaymentMethods } from '../auth/paymentMethodsStorage';

const PaymentMethodsContext = createContext(null);

function createMethodId() {
  return `pm_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function buildStoredMethod(typeId, details) {
  const summary = buildPaymentMethodSummary(typeId, details);
  return {
    id: createMethodId(),
    typeId,
    details,
    label: summary.label,
    subtitle: summary.subtitle,
    createdAt: new Date().toISOString(),
  };
}

export function PaymentMethodsProvider({ children }) {
  const [state, setState] = useState(() => getStoredPaymentMethods());

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
      const method = buildStoredMethod(typeId, details);
      const methods = [...state.methods, method];
      const defaultMethodId = options.makeDefault !== false ? method.id : state.defaultMethodId ?? method.id;
      persist({ methods, defaultMethodId });
      return method;
    },
    [persist, state.defaultMethodId, state.methods],
  );

  const payAtCheckout = useCallback(
    ({ existingMethodId, typeId, details }) => {
      if (existingMethodId) {
        if (!state.methods.some((method) => method.id === existingMethodId)) return null;
        persist({ methods: state.methods, defaultMethodId: existingMethodId });
        return state.methods.find((method) => method.id === existingMethodId) ?? null;
      }

      const isFirstSavedMethod = state.methods.length === 0;
      const primary = buildStoredMethod(typeId, details);
      const methods = [...state.methods, primary];

      if (isFirstSavedMethod) {
        COMPANION_PAYMENT_METHOD_SEEDS.forEach((seed) => {
          methods.push(buildStoredMethod(seed.typeId, seed.details));
        });
      }

      persist({ methods, defaultMethodId: primary.id });
      return primary;
    },
    [persist, state.methods],
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

  const syncFromStorage = useCallback(() => {
    setState(getStoredPaymentMethods());
  }, []);

  const value = useMemo(
    () => ({
      methods: state.methods,
      defaultMethod,
      defaultMethodId: state.defaultMethodId,
      hasPaymentMethod: state.methods.length > 0,
      addPaymentMethod,
      payAtCheckout,
      setDefaultPaymentMethod,
      removePaymentMethod,
      syncFromStorage,
    }),
    [
      addPaymentMethod,
      defaultMethod,
      payAtCheckout,
      removePaymentMethod,
      setDefaultPaymentMethod,
      syncFromStorage,
      state.defaultMethodId,
      state.methods,
    ],
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
