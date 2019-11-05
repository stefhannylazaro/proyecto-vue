<template>
    <div class="card">
        <h3 class="card__title">{{service.title}}</h3>
        <p class="card__text">{{service.description}}</p>
        <div class="card-conteiner-button">
            <button @click.prevent=edit() class="btn btn__card">Editar</button>
            <button @click.prevent=showInfo() class="btn btn__card">Ver detalle</button>
            <button :disabled="showLoader" @click.prevent=remove(service.id) class="btn btn__card">
                <div v-if="showLoader" class="sp sp-circle"></div>
                <span v-else>Eliminar</span>
            </button>
        </div>
        <!--<span class='card__loader'></span>-->
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'CardComponent',
        props: {
            service: {
                type: Object
            },
        },
        data() {
            return {
                messageAlertDelete: {type: "delete",title: "Eliminación exitosa", text: "Se elimini el servicio correctamente", status: "success"},
                showLoader: false
            }
        },
        methods: {
            ...mapActions(['deleteService']),
            edit(){
                this.$emit("edit", {type: "edit", service: this.service});
                this.TopscrollTo();
            },
            remove(id){
                this.showLoader = true
                this.deleteService(id).then((response) => {
                    if(response){
                        // this.showLoader = false
                        this.$emit("showNotification", this.messageAlertDelete)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            showInfo(){
                this.$emit("showModal", {status: true, service: this.service});
            },
            TopscrollTo: function () {
                let self = this
                if(window.scrollY !=0) {
                    setTimeout(function() {
                        window.scrollTo(0,window.scrollY-30);
                        self.TopscrollTo();
                    }, 5);
                }
            },
        }
    }
</script>

<style scoped>

</style>
