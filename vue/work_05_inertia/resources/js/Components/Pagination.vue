<script>

    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            }
        },


        methods: {
            changePage(url) {
                const page = url.split('?page=')[1];
                this.$inertia.visit(this.$inertia.page.url, {
                    replace: true,
                    preserveState: true,
                    data: {
                        page: page
                    }
                });
            }
        }
    }

</script>

<template>

    <nav aria-label="Page navigation example" class="mt-5"
    v-if="pagination.links.length > 3">

        <ul class="flex items-center -space-x-px h-10 text-base justify-end">

            <template v-for="(link, key) in pagination.links">

                <li>

                    <a v-if="link.url === null" :key="key" href="#" v-html="link.label"
                    :class="link.active ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'">
                    </a>

                    <!-- <Link v-else :key="'link-'+ key" :href="link.url" :class="link.active ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'" v-html="link.label">
                    </Link> -->

                    <a v-else :key="'link-'+ key" @click="changePage(link.url)" href="#" :class="link.active ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'" v-html="link.label">
                    </a>

                </li>

            </template>
        </ul>
    </nav>

</template>
