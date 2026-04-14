<template>
  <div class="category-filter">
    <button
      :class="['category-filter__btn', { 'category-filter__btn--active': modelValue === '' }]"
      @click="$emit('update:modelValue', '')"
    >
      Todos
    </button>
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['category-filter__btn', { 'category-filter__btn--active': modelValue === cat }]"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  modelValue: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<style scoped>
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-filter__btn {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;
  color: #374151;
}

.category-filter__btn:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.category-filter__btn--active {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}
</style>
