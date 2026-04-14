<template>

    <AppLayout title="Contactos">

        <template #header>

            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Contactos
            </h2>

        </template>

        <div class="container">

            <h1 class="text-2xl mb-4">
                <span class="text-indigo-500">Contacts / </span> Edit
            </h1>

            <div class="bg-white px-6 py-8 rounded-lg shadow">

                {{ this.$page.props.errors }}

                <div class="grid grid-cols-2 gap-6">

                    <div>
                        <label>
                            <span class="text-gray-700">Nombres</span>
                            <input v-model="form.first_name" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Apellidos</span>
                            <input v-model="form.last_name" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Organizacion</span>
                            <select v-model="form.organization_id" class="w-full"
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
                            <input v-model="form.email" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Telefono</span>
                            <input v-model="form.phone" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Direccion</span>
                            <input v-model="form.address" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Ciudad</span>
                            <input v-model="form.city" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Estado</span>
                            <input v-model="form.state" type="text" class="w-full">
                        </label>
                    </div>

                    <div>
                        <label>
                            <span class="text-gray-700">Pais</span>
                            <select v-model="form.country_id" class="w-full">
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
                            <input v-model="form.post_code" type="text" class="w-full">
                        </label>
                    </div>

                </div>

                <div class="flex justify-end mt-3">

                    <button class="btn btn-indigo" @click="update">Guardar</button>

                    <button class="btn btn-red ml-5" @click="destroy">Eliminar</button>

                </div>

            </div>

        </div>

    </AppLayout>

</template>

<script>
    import AppLayout from '@/Layouts/AppLayout.vue'
    import Input from '@/Components/TextInput.vue'

    export default {
        components: {
            AppLayout,
            Input,
        },
        data() {
            return {
                form: this.contact,
            }
        },
        props: {
            contact: {
                type: Object,
                required: true,
            },
            organizations: {
                type: Object,
                required: true,
            },
            countries: {
                type: Object,
                required: true,
            },
        },

        methods: {
            update() {
                this.$inertia.put(this.route('contact.update', this.contact), this.form)
            },
            destroy() {
                this.$inertia.delete(this.route('contact.destroy', this.contact))
            },
        }
    }

</script>