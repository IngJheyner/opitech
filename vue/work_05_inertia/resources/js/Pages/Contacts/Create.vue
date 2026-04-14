<template>

    <app-layout>

        <template #header>

            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Crear contacto
            </h2>

        </template>

        <div class="container">

            <h1 class="text-2xl mb-4">
                <span class="text-indigo-500">Contacts / </span> Create
            </h1>

            <div class="bg-white px-6 py-8 rounded-lg shadow">

                {{ this.$page.props.errors }}

                <div class="grid grid-cols-2 gap-6">

                    <div>
                        <label>
                            <span class="text-gray-700">Nombres</span>
                            <input v-model="contact.first_name" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Apellidos</span>
                            <input v-model="contact.last_name" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Organizacion</span>
                            <select v-model="contact.organization_id" class="w-full"
                            >
                                <option value="" selected disabled>Seleccione una organizacion</option>
                                <option v-for="organization in organizations" :key="'organization-' + organization.id"
                                :value="organization.id">
                                    {{ organization.name }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">E-mail</span>
                            <input v-model="contact.email" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Telefono</span>
                            <input v-model="contact.phone" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Direccion</span>
                            <input v-model="contact.address" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Ciudad</span>
                            <input v-model="contact.city" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Estado</span>
                            <input v-model="contact.state" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Pais</span>
                            <select v-model="contact.country_id" class="w-full">
                                <option value="" selected disabled>Seleccione un pais</option>
                                <option v-for="country in countries" :key="'country-' + country.id"
                                :value="country.id">
                                    {{ country.name }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Postal Code</span>
                            <input v-model="contact.post_code" type="text" class="w-full">
                        </label>
                    </div>

                </div>

                <div class="flex justify-end mt-3">

                    <button class="btn btn-indigo" @click="store">Guardar</button>

                </div>

            </div>

        </div>

    </app-layout>

</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue'
    import Input from '@/Components/TextInput.vue'

    export default {
        props:{
            organizations: {
                type: Object,
                required: true,
            },
            countries: {
                type: Object,
                required: true,
            },
        },
        components: {
            AppLayout,
        },

        data() {
            return {
                contact: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    post_code: '',
                    organization_id: '',
                    country_id: '',
                }
            }
        },

        methods: {
            store() {
                this.$inertia.post(this.route('contact.store'), this.contact)
            }
        }

    }

</script>