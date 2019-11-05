<template>
    <section class="container">
        <NavigationComponent></NavigationComponent>
        <main class="services-view">
            <section v-if="listServices" class="services-view__left">
                <template v-if="listServices.length>0">
                    <CardComponent
                            v-for="itemService in listServices"
                            :service = "itemService"
                            :key= "itemService.id"
                            @edit="editData"
                            @showModal="showModal"
                            @showNotification="showNotification"
                    >
                    </CardComponent>
                </template>
                <template v-else>
                    <NotServicesComponent></NotServicesComponent>
                </template>

            </section>
            <LoaderComponent v-else>
            </LoaderComponent>
            <section class="services-view__right">
                <FormComponent
                        :infoService ="infoService"
                        @resetForm="resetForm"
                        @showNotification="showNotification">
                </FormComponent>
            </section>
        </main>
        <ModalComponent v-if="statusModal" @close="statusModal = false" :service="this.infoModal"></ModalComponent>
        <notifications group="foo" />
    </section>
</template>
<script>
    // @ is an alias to /src
    import LoaderComponent from '@/components/LoaderComponent.vue'
    import NavigationComponent from '@/components/NavigationComponent.vue'
    import CardComponent from '@/components/CardComponent.vue'
    import FormComponent from '@/components/FormComponent.vue'
    import ModalComponent from '@/components/ModalComponent.vue'
    import NotServicesComponent from '@/components/NotServicesComponent.vue'


    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    export default {
        name: 'home',
        data() {
            return {
                infoService: null,
                statusModal: false,
                infoModal: null
            }
        },
        computed: {
            ...mapGetters(['listServices']),
        },
        methods: {
            ...mapActions(['getListServices']),
            editData(val) {
                this.infoService = val.service
            },
            resetForm(val) {
                this.infoService = null
            },
            showNotification(val){
                this.$notify({
                    group: 'foo',
                    title: val.title,
                    text: val.text,
                    type: val.status
                });
            },
            showModal(val){
                this.statusModal = val.status;
                this.infoModal = val.service
            }
        },
        created() {
            this.getListServices().then((response) => {}).catch(err => {
                console.log(err)
            })
        },
        components: {
            LoaderComponent,
            NavigationComponent,
            CardComponent,
            FormComponent,
            NotServicesComponent,
            ModalComponent
        }
    }
</script>

<style scoped lang="scss">
</style>
