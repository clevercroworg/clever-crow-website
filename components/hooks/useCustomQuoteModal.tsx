"use client"

import { useState, useCallback } from "react"
import CustomQuoteForm from "@/components/modals/CustomQuoteForm"

export function useCustomQuoteModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openCustomQuote = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeCustomQuote = useCallback(() => {
    setIsOpen(false)
  }, [])

  const CustomQuoteModal = useCallback(() => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeCustomQuote}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-xl p-6">
          <CustomQuoteForm onClose={closeCustomQuote} />
        </div>
      </div>
    )
  }, [isOpen, closeCustomQuote])

  return {
    openCustomQuote,
    closeCustomQuote,
    CustomQuoteModal,
  }
}
