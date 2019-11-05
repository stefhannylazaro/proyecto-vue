<template>
    <form class="form-service" action="">
        <!--<pre>{{infoService}}</pre>-->
        <h2 class="form-service__title">{{titleForm}}</h2>
        <div class="form-service__group" :class="{'input-error':error.title}">
            <label for="name">Nombre</label>
            <input v-model="title" id="name" class="form-box" name="name" type="text">
            <span class="error" v-text="error.title"></span>
        </div>
        <div class="form-service__group" :class="{'input-error':error.category}">
            <label>Categoria</label>
            <v-select v-model="category" placeholder="seleccione una categoria" :options="options">
                <span slot="no-options">No se encontro resultado.</span>
            </v-select>
            <span class="error" v-text="error.category"></span>
        </div>
        <div class="form-service__group" :class="{'input-error':error.description}">
            <label for="description">Descripción</label>
            <textarea v-model="description" id="description" class="form-box" name="description" type="text"/>
            <span class="error" v-text="error.description"></span>
        </div>
        <div class="form-service__buttons">
            <button :disabled="showLoader" @click.prevent=save() class="btn btn__service btn__service--save">
                <span>Grabar</span>
                <div v-if="showLoader" class="sp sp-circle"></div>
            </button>
            <button @click.prevent=resetForm() class="btn btn__service btn__service--cancel">Cancelar</button>
        </div>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'FormComponent',
        props: {
            infoService: {},
        },
        data() {
            return {
                options: ["Autos", 'Salud', 'Hogar'],
                title: "",
                description: "",
                category: null,
                error: {
                    title: null,
                    description: null,
                    category: null,
                },
                messageAlertRegister: {type: "register",title: "Registro exitoso", text: "Se registro el servicio correctamente", status: "success"},
                messageAlertEdit: {type: "edit",title: "Edición exitosa", text: "Se edito el servicio correctamente", status: "success"},
                alertMessage: "Campo requerido",
                showLoader: false
            }
        },
        methods: {
            ...mapActions(['saveService', 'updateService']),
            save() {
                if (this.formSuccess) {
                    let dataObject = {
                        title: this.title,
                        description: this.description,
                        category: this.category
                    };
                    this.infoService === null ? this.setSaveService(dataObject):this.setEditService(dataObject)
                }
            },
            setSaveService(dataObjectSave){
                this.showLoader = true
                this.saveService(dataObjectSave).then((response) => {
                    if(response){
                        this.showLoader = false
                        this.$emit("showNotification", this.messageAlertRegister)
                        this.resetForm()
                    }
                }).catch(err => {
                    this.showLoader = false
                    console.log(err)
                })
            },
            setEditService(dataObjectEdit){
                let infoEdit = {
                    id: this.infoService.id,
                    dataEdit: dataObjectEdit
                }
                this.showLoader = true
                this.updateService(infoEdit).then((response) => {
                    if(response){
                        this.showLoader = false
                        this.$emit("showNotification", this.messageAlertEdit)
                        this.resetForm()
                    }
                }).catch(err => {
                    this.showLoader = false
                    console.log(err)
                })
            },
            resetForm(){
                this.$emit("resetForm");
                this.clearForm();
            },
            clearForm(){
                this.title = ""
                this.description = ""
                this.category = null

                this.error.title = null
                this.error.description = null
                this.error.category = null
            }
        },
        computed: {
            formSuccess() {
                let response = true
                if (this.title === "") {
                    this.error.title = this.alertMessage
                    response = false
                }
                if (this.description === "") {
                    this.error.description = this.alertMessage
                    response = false
                }
                if (this.category === null) {
                    this.error.category = this.alertMessage
                    response = false
                }
                return response
            },
            titleForm(){
                return (this.infoService === null)? "Crear servicio": "Editar servicio"
            }
        },
        watch: {
            infoService: function (el) {
                if (el) {
                    this.title = el.title
                    this.description = el.description
                    this.category = el.category
                }
            },
            name: function (el) {
                if (el) {
                    this.error.name = null;
                }
            },
            description: function (el) {
                if (el) {
                    this.error.description = null;
                }
            },
            category: function (el) {
                if (el) {
                    this.error.category = null;
                }
            },
        }
    }
</script>

<style scoped lang="scss">
</style>
