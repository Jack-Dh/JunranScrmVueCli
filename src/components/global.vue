<template>
    
</template>

<script>
    export default {
        name: "global",
        data(){
            return {
                token:'2232323'
            }
        },
        methods:{

        },
        beforeCreate:function () {

            this.token=this.$cookies.get('token')
        }
    }
</script>

<style scoped>

</style>