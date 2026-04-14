import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchProducts, fetchCategories } from '@/api/products'
import type { Product } from '@/types/product'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Filtrado reactivo: búsqueda y categoría se aplican juntos
  const filteredProducts = computed(() => {
    return products.value.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value
        ? p.category === selectedCategory.value
        : true
      return matchesSearch && matchesCategory
    })
  })

  const loadProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
    } catch {
      error.value = 'No se pudieron cargar los productos. Intenta de nuevo.'
    } finally {
      isLoading.value = false
    }
  }

  const loadCategories = async () => {
    try {
      categories.value = await fetchCategories()
    } catch {
      // Las categorías son secundarias; si fallan no bloqueamos la app
      console.warn('No se pudieron cargar las categorías')
    }
  }

  const setSearch = (query: string) => {
    searchQuery.value = query
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
  }

  return {
    products,
    categories,
    searchQuery,
    selectedCategory,
    isLoading,
    error,
    filteredProducts,
    loadProducts,
    loadCategories,
    setSearch,
    setCategory,
  }
})
