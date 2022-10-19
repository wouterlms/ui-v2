import { ref } from 'vue'

interface Toast {
  id: number
  title: string
  message: string
  timeout?: number
  icon?: string
  accentColor?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const toasts = ref<Toast[]>([])

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const removeToast = (toast: Toast): void => {
    toasts.value = toasts.value.filter((t) => t.id !== toast.id)
  }

  const createToast = (toast: Omit<Toast, 'id'>): Toast => {
    const t = {
      ...toast,
      id: Date.now(),
    }

    toasts.value.push(t)

    if (t.timeout !== undefined) {
      setTimeout(() => {
        removeToast(t)
      }, t.timeout)
    }

    return t
  }

  return {
    toasts,
    createToast,
    removeToast,
  }
}
