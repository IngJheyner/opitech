<template>
  <div class="detail-view">
    <button class="detail-view__back" @click="router.back()">← Volver</button>

    <div v-if="isLoading" class="detail-view__feedback">
      <div class="spinner" role="status" aria-label="Cargando producto"></div>
      <p>Cargando producto...</p>
    </div>

    <div v-else-if="error" class="detail-view__feedback detail-view__feedback--error">
      <p>{{ error }}</p>
    </div>

    <article v-else-if="product" class="detail-card">
      <div class="detail-card__image-wrapper">
        <img :src="product.image" :alt="product.title" class="detail-card__image" />
      </div>

      <div class="detail-card__content">
        <span class="detail-card__category">{{ product.category }}</span>
        <h1 class="detail-card__title">{{ product.title }}</h1>

        <div class="detail-card__rating">
          <span class="stars">★ {{ product.rating.rate }}</span>
          <span class="count">({{ product.rating.count }} reseñas)</span>
        </div>

        <p class="detail-card__price">${{ product.price.toFixed(2) }}</p>
        <p class="detail-card__description">{{ product.description }}</p>

        <button class="btn-add">Agregar al carrito</button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProductById } from '@/api/products'
import type { Product } from '@/types/product'

const route = useRoute()
const router = useRouter()

const product = ref<Product | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  try {
    product.value = await fetchProductById(Number(route.params.id))
  } catch {
    error.value = 'No se pudo cargar el producto.'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.detail-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.detail-view__back {
  background: none;
  border: none;
  font-size: 0.95rem;
  color: #2563eb;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 0;
}

.detail-view__feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: #6b7280;
}

.detail-view__feedback--error {
  color: #dc2626;
}

.detail-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.detail-card__image-wrapper {
  background: #f8f8f8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 300px;
}

.detail-card__image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.detail-card__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-card__category {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  font-weight: 600;
}

.detail-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
  margin: 0;
}

.detail-card__rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #f59e0b;
  font-weight: 700;
}

.count {
  font-size: 0.85rem;
  color: #6b7280;
}

.detail-card__price {
  font-size: 2rem;
  font-weight: 800;
  color: #2563eb;
  margin: 0;
}

.detail-card__description {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.7;
  margin: 0;
}

.btn-add {
  margin-top: auto;
  padding: 0.8rem 1.5rem;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}

.btn-add:hover {
  background: #1d4ed8;
}

@media (max-width: 640px) {
  .detail-card {
    grid-template-columns: 1fr;
  }
}
</style>
