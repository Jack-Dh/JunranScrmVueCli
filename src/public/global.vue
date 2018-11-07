<template>
    
</template>

<script>
    export default {
        name: "global",
        data(){
            return {
                token:''
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