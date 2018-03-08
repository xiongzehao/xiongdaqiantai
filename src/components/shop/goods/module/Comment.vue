<template>
    <div class="comment-box">
        <!--取得评论总数-->
        <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;m">
            <div class="avatar-box">
                <i class="iconfont icon-user-full"></i>
            </div>
            <div class="conn-box">
                <div class="editor">
                    <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容" v-model="selectValue"></textarea>
                    <span class="Validform_checktip"></span>
                </div>
                <div class="subcon">
                    <input id="btnSubmit" name="submit" type="button" value="提交评论" @click="addComment" class="submit">
                    <span class="Validform_checktip"></span>
                </div>
            </div>
        </form>
        <ul id="commentList" class="list-box">
            <p v-if="commentData.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
            <li v-for="(item,index) in commentData" :key="index">
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="inner-box">
                    <div class="info">
                        <span>{{item.user_name}}</span>
                        <span>{{item.add_time}}</span>
                    </div>
                    <p>{{item.content}}</p>
                </div>
            </li>
    
        </ul>
        <!--放置页码-->
        <div class="page-box" style="margin:5px 0 0 62px">
            <div id="pagination" class="digg">
                <span class="disabled">« 上一页</span>
                <span class="current">1</span>
                <span class="disabled">下一页 »</span>
            </div>
        </div>
        <!--/放置页码-->
    </div>
</template>

<script>
export default {
   data(){
       return {
          id:this.$route.params.id,
          selectValue:'',
          commentData:[]
       }
   },
    methods:{
        getComment(){
             this.$axios.get(this.$api.commentList+'goods/'+this.id+'?pageIndex=1&pageSize=5').then(res=>{
                 if(res.data.status ==0){
                      this.commentData = res.data.message
                 }
             })
        },
        addComment(){
             this.$axios.post(this.$api.comment+'goods/'+this.id,{commenttxt:this.selectValue}).then(res=>{
                  if(res.data.status==0){
                       this.$alert("评论成功",'温馨提示',{
                           callback:()=>{
                                this.getComment()
                                this.selectValue = ''
                           }
                       })
                  }
             })
        }
    },
    created(){
        this.getComment()
    },
    watch:{
        $route(){
           this.id = this.$route.params.id;
         this.getComment();
        }
    }
};
</script>

<style scoped>

</style>