<template>
    <div>
          <m-header></m-header>
   <router-view/>
       <m-footer></m-footer>
    </div>
</template>

<script>
 import MHeader from './public/Header.vue'
 import MFooter from './public/Footer.vue'
    export default {
        components:{
            MHeader,
            MFooter
        }
    }
</script>

<style scoped>

</style>