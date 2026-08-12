"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({
  message,
  isVisible,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed right-5 top-5 z-50 rounded-lg bg-black px-5 py-3 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <span>✓</span>

        <span>{message}</span>

        <button
          onClick={onClose}
          className="ml-2 text-lg text-gray-300 hover:text-white"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}