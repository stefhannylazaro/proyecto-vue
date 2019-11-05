<template>
    <header class="header">
        <h1 class="header__title">Servicios</h1>
        <nav class="nav">
            <ul class="nav-list">
                <li class="nav-list__item"
                    :class="defaultSelect == item.id ? 'nav-list__item--active' : ''"
                    :key="item.id"
                    v-for="item in listFilterNav">
                    <a @click.prevent="filterList(item)">{{item.name}}</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'NavigationComponent',
        data() {
            return {
                listFilterNav: [{name:'Todos',id: 0}, {name:'Autos',id: 1}, {name:'Salud',id: 2}, {name:'Hogar',id: 3}],
                defaultSelect: 0
            }
        },
        methods: {
            ...mapActions(['getListServices']),
            filterList(item) {
                this.defaultSelect = item.id;
                this.getListServices(item.name).then((response) => {
                    if (!response) {
                        alert("error en el servicio")
                    } else {
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
