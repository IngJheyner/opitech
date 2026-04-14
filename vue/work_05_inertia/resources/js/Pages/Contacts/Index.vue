<template>

    <AppLayout title="Contactos">

        <template #header>

            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Contactos
            </h2>

        </template>

        <div class="container">

            <h1 class="text-2xl mb-4">Listado de contactos</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div class="my-5 px-6 py-4 flex items-center">
                    <Input type="text" class="flex-1" placeholder="Ingrese un texto para buscar"
                    v-model="search"/>
                    <Link class="ml-4 flex-shrink-0 btn btn-blue"
                    :href="route('contact.create')">Nuevo</Link>
                </div>



                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-900 dark:bg-white-700 dark:text-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Organizacion
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ciudad
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Telefono
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-white dark:border-gray-700"
                        v-for="contact in contacts.data" :key="contact.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-700">
                                {{ contact.first_name }} {{ contact.last_name  }}
                            </th>
                            <td class="px-6 py-4">
                                {{ contact.organization.name }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.city }}
                            </td>
                            <td class="px-6 py-4">
                                {{ contact.phone }}
                            </td>
                            <td class="px-6 py-4">
                                <Link :href="route('contact.edit', contact)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <Pagination :pagination="contacts" />

            </div>

        </div>

    </AppLayout>

</template>

<script>

    import AppLayout from '@/Layouts/AppLayout.vue'
    import Pagination from '@/Components/Pagination.vue'
    import Input from '@/Components/TextInput.vue'
    import pickBy from 'lodash/pickBy'
    import { Link } from '@inertiajs/vue3';

    export default {
        components: {
            AppLayout,
            Pagination,
            Input,
            Link,
        },
        data() {
            return {
                search: this.filters.search || '',
            }
        },
        watch: {
            search($value) {
                //this.$inertia.get('contact', { search: $value }, {
                this.$inertia.get('contact', pickBy({ search: $value, page: this.page }), {
                    replace: true,
                    preserveState: true,
                });
            },
        },
        props: {
            contacts: {
                type: Object,
                required: true,
            },
            filters: {
                type: Object,
                required: false,
            },
        },
    }

</script>