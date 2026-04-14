// Para usar la composicion de la api
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default function usePagination() {

  const pagination = ref({});
  const route = useRoute();
  const router = useRouter();

  // Computed
  const page = computed(() => {
    let page = route.query.page ?? 1;

    if (page > pagination.value.last_page) {
      // Se remplaza el parametro page por el ultimo en la url
      router.replace({ query: { page: pagination.value.last_page } })
      return pagination.value.last_page;
    }

    return page;
  })

  // Metodos
  const setPagination = (meta) => {
    pagination.value = {
      links: meta.links,
      last_page: meta.last_page
    }
  }

  // Cambiar de pagina
  const changePage = (url) => {

    let page = url.split("page=")[1];
    router.replace({ query: { page: page } });

  }

  return {
    pagination,
    page,
    setPagination,
    changePage,
  }
}