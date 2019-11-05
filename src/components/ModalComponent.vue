<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-container__header">
                        <h2>Detalle del servicio</h2>
                        <button class="btn modal-container__header--close" @click="$emit('close')">X</button>
                    </div>

                    <div class="modal-container__body">
                        <div>
                            <h3>Titulo</h3>
                            <p>{{service.title}}</p>
                        </div>
                        <div>
                            <h3>Categoría</h3>
                            <p>{{service.category}}</p>
                        </div>
                        <div>
                            <h3>Descripción</h3>
                            <p>{{service.description}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ModalComponent",
        props: {
            service: {
                type: Object
            },
        },
    }
</script>

<style scoped lang="scss">
    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
