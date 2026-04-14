<template>
  <nav class="pagination" aria-label="Paginación de productos">
    <button
      class="pagination__btn"
      :disabled="currentPage === 1"
      aria-label="Página anterior"
      @click="$emit('change', currentPage - 1)"
    >
      ‹
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['pagination__btn', { 'pagination__btn--active': page === currentPage }]"
      :aria-current="page === currentPage ? 'page' : undefined"
      @click="$emit('change', page)"
    >
      {{ page }}
    </button>

    <button
      class="pagination__btn"
      :disabled="currentPage === totalPages"
      aria-label="Página siguiente"
      @click="$emit('change', currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{ change: [page: number] }>()

// Muestra máximo 5 páginas centradas en la actual para no saturar la UI
const visiblePages = computed(() => {
  const range = 2
  const start = Math.max(1, props.currentPage - range)
  const end = Math.min(props.totalPages, props.currentPage + range)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  justify-content: center;
}

.pagination__btn {
  min-width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #374151;
  font-weight: 500;
}

.pagination__btn:hover:not(:disabled) {
  border-color: #2563eb;
  color: #2563eb;
}

.pagination__btn--active {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
