import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 4000,
    });
  },

  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  custom: (message: any) => {
    sonnerToast(message);
  },
};

export function showSignalNotification(signal: any) {
  toast.info(
    `New ${signal.direction} signal`,
    `${signal.pair} - Entry: ${signal.entry_price}`
  );
}

export function showTradeNotification(trade: any) {
  if (trade.pnl >= 0) {
    toast.success(
      `Trade Closed: +$${trade.pnl.toFixed(2)}`,
      `${trade.pair} ${trade.direction}`
    );
  } else {
    toast.error(
      `Trade Closed: -$${Math.abs(trade.pnl).toFixed(2)}`,
      `${trade.pair} ${trade.direction}`
    );
  }
}

export function showAccountNotification(account: any, verified: boolean) {
  if (verified) {
    toast.success(
      'Account Verified!',
      `${account.account_name} is now ready for trading`
    );
  } else {
    toast.info(
      'Account Added',
      `${account.account_name} is being verified`
    );
  }
}
