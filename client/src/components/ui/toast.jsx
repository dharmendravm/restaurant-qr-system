import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast) => {
      const id = ++idCounter;
      const duration = toast.duration ?? 3000;

      setToasts((prev) => [
        ...prev,
        {
          id,
          type: toast.type || "info",
          title: toast.title,
          description: toast.description,
        },
      ]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast]
  );

  const value = {
    show: showToast,
    success: (title, description, opts) =>
      showToast({ type: "success", title, description, ...opts }),
    error: (title, description, opts) =>
      showToast({ type: "error", title, description, ...opts }),
    info: (title, description, opts) =>
      showToast({ type: "info", title, description, ...opts }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast viewport */}
      <div className="fixed z-60 top-20 right-3 flex flex-col gap-3 w-[min(320px,90vw)]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};

const typeStyles = {
  success: {
    icon: CheckCircle2,
    badge: "Success",
    container: "bg-emerald-50 border-emerald-200 text-emerald-900",
  },
  error: {
    icon: AlertCircle,
    badge: "Error",
    container: "bg-rose-50 border-rose-200 text-rose-900",
  },
  info: {
    icon: Info,
    badge: "Info",
    container: "bg-[#fffdf8] border-[#f3e2d2] text-[#1b130c]",
  },
};

const Toast = ({ toast, onClose }) => {
  const { type = "info", title, description } = toast;
  const conf = typeStyles[type] || typeStyles.info;
  const Icon = conf.icon;

  const safeTitle =
    typeof title === "string" || typeof title === "number"
      ? title
      : title != null
      ? JSON.stringify(title)
      : null;

  const safeDescription =
    typeof description === "string" || typeof description === "number"
      ? description
      : description != null
      ? JSON.stringify(description)
      : null;

  return (
    <div
      className={`border shadow-[0_12px_30px_rgba(0,0,0,0.18)] rounded-2xl px-4 py-3 flex gap-3 items-start ${conf.container}`}
    >
      <div className="mt-0.5">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            {safeTitle && (
              <p className="text-xs font-semibold leading-tight mb-0.5 line-clamp-2">
                {safeTitle}
              </p>
            )}
            {safeDescription && (
              <p className="text-[11px] leading-snug opacity-80 line-clamp-3">
                {safeDescription}
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="ml-1 text-[10px] font-semibold opacity-60 hover:opacity-100 transition"
      >
        x
      </button>
    </div>
  );
};
