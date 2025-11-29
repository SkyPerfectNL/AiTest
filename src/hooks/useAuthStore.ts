import { useAuthStore as useAuthStoreImpl } from '@stores/'

// Прямой доступ к store для компонентов, которым нужны токены
export const useAuthStore = () => {
  return useAuthStoreImpl()
}
