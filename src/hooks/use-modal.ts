'use client'

import { useCallback, useRef, useState } from 'react'

type ModalState = Record<string, boolean>

type ModalKey<T> = Extract<keyof T, string>

type ModalFunc<T extends ModalState> = (key: ModalKey<T>) => void

interface UseModalReturn<T extends ModalState> {
    modalState: T
    openModal: ModalFunc<T>
    closeModal: ModalFunc<T>
    toggleModal: ModalFunc<T>
    isOpen: ModalFunc<T>
    closeAll: () => void
    reset: () => void
}

export default function useModal<T extends ModalState>(initialState: T): UseModalReturn<T> {
    const initialRef = useRef<T>(initialState)
    const [modalState, setModalState] = useState<T>(initialState)

    const openModal: ModalFunc<T> = useCallback((key) => {
        setModalState(prev => ({ ...prev, [key]: true }))
    }, [])

    const closeModal: ModalFunc<T> = useCallback((key) => {
        setModalState(prev => ({ ...prev, [key]: false }))
    }, [])

    const toggleModal: ModalFunc<T> = useCallback((key) => {
        setModalState(prev => ({ ...prev, [key]: !prev[key] }))
    }, [])

    const closeAll = useCallback(() => {
        setModalState(prev => {
            const next = { ...prev } as ModalState
            (Object.keys(next) as Array<ModalKey<ModalState>>).forEach(key => {
                next[key] = false
            })
            return next as T
        })
    }, [])

    const reset = useCallback(() => {
        setModalState(initialRef.current)
    }, [])

    const isOpen: ModalFunc<T> = useCallback((key) => modalState[key], [modalState])

    return {
        modalState,
        openModal,
        closeModal,
        toggleModal,
        closeAll,
        reset,
        isOpen,
    }
}

