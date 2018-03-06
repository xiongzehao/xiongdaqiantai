<template>
    <div class="left-220">
        <ul class="side-img-list">

            <li v-for="(item,index) in list" :key="item.id">
                <div class="img-box">
                    <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                     <router-link :to="{path:`detail/${item.id}`}">{{item.title}}</router-link>
                    <span>{{item.add_time | timer}}</span>
                </div>
            </li>

         

        </ul>
    </div>
</template>

<script>
export default {
     props:['list'],
     filters:{
           timer(tmpDate){
                 let data = new Date(tmpDate)
                 return  data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate()+':'+data.getHours()+':'+data.getMinutes()+':'+data.getSeconds()
           }
     }


};
</script>

<style scoped>

</style>