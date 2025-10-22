import { useState } from "react";

export const useAccordion = <T extends string | number>(
  initialOpenId?: T | null
) => {
  const [openId, setOpenId] = useState<T | null>(initialOpenId || null);

  const handleToggle = (id: T) => {
    setOpenId(openId === id ? null : id);
  };

  const open = (id: T) => {
    setOpenId(id);
  };

  const close = () => {
    setOpenId(null);
  };

  const isOpen = (id: T) => openId === id;

  return {
    openId,
    handleToggle,
    open,
    close,
    isOpen,
  };
};

