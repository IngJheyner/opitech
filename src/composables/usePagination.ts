import { ref, computed, type Ref, type ComputedRef } from 'vue'

// Acepta tanto ref como computed — la paginación no le importa de dónde vienen los datos
export function usePagination<T>(items: Ref<T[]> | ComputedRef<T[]>, pageSize = 8) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })

  // Al cambiar el filtro desde afuera, reseteamos a la primera página
  const resetPage = () => {
    currentPage.value = 1
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    resetPage,
    goToPage,
  }
}
