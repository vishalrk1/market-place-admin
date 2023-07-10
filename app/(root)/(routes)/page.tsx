"use client";
import React, { useEffect } from 'react'

import { Modal } from "@/components/ui/modal";
import { useStoreModel } from '@/hooks/use-stor-modal';

const SetUpPage = () => {
  const onOpen = useStoreModel((state) => state.onOpen);
  const isOpen = useStoreModel((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}

export default SetUpPage;