<template>
  <div class="products-view">
    <header class="products-view__header">
      <h1 class="products-view__title">Dashboard de Productos</h1>
      <p class="products-view__subtitle">{{ store.filteredProducts.length }} producto(s) encontrado(s)</p>
    </header>

    <div class="products-view__controls">
      <SearchBar v-model="store.searchQuery" @update:model-value="onSearchChange" />
      <CategoryFilter
        v-model="store.selectedCategory"
        :categories="store.categories"
        @update:model-value="onCategoryChange"
      />
    </div>

    <!-- Estado de carga -->
    <div v-if="store.isLoading" class="products-view__feedback">
      <div class="spinner" role="status" aria-label="Cargando productos"></div>
      <p>Cargando productos...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="store.error" class="products-view__feedback products-view__feedback--error">
      <p>{{ store.error }}</p>
      <button class="btn-retry" @click="store.loadProducts()">Reintentar</button>
    </div>

    <!-- Sin resultados -->
    <div v-else-if="paginatedItems.length === 0" class="products-view__feedback">
      <p>No se encontraron productos con esos criterios.</p>
    </div>

    <!-- Grid de productos -->
    <section v-else class="products-grid">
      <ProductCard
        v-for="product in paginatedItems"
        :key="product.id"
        :product="product"
        @click="goToDetail(product.id)"
      />
    </section>

    <PaginationBar
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { usePagination } from '@/composables/usePagination'
import ProductCard from '@/components/ProductCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import PaginationBar from '@/components/PaginationBar.vue'

const router = useRouter()
const store = useProductStore()

// storeToRefs no hace falta aquí — accedo al computed directamente desde el store
const { currentPage, totalPages, paginatedItems, resetPage, goToPage } = usePagination(
  computed(() => store.filteredProducts),
)

// Cada vez que cambia el filtro, volvemos a la página 1
const onSearchChange = () => resetPage()
const onCategoryChange = () => resetPage()

const goToDetail = (id: number) => {
  router.push({ name: 'product-detail', params: { id } })
}

onMounted(async () => {
  // Solo cargamos si el store está vacío — evita refetch innecesario al volver del detalle
  if (store.products.length === 0) {
    await Promise.all([store.loadProducts(), store.loadCategories()])
  }
})

// Resetea la página si los filtros cambian por cualquier causa externa
watch(() => store.filteredProducts, resetPage)
</script>

<style scoped>
.products-view {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.products-view__header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.products-view__title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.products-view__subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.products-view__controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.products-view__feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #6b7280;
}

.products-view__feedback--error {
  color: #dc2626;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-retry {
  padding: 0.5rem 1.25rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
</style>
