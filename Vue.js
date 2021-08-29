// api接口：https://autumnfish.cn
var app = new Vue({
    el:"#app",
    data:{
    indexNum:"",   
    keyword:"",
    playList:[],
    musicList:[],
    musicUrl:"",
    showIndex:[0,0,0,0,0,0,0,0,1],
    basiculList:[
        ["在线音乐",[{address:"/img/推荐.png",title:"推荐",address1:"img/推荐 (1).png"},{address:"/img/音乐.png",title:"音乐馆",address1:"img/音乐 (1).png"},{address:"/img/视频.png",title:"视频",address1:"img/视频 (1).png"},{address:"/img/电台.png",title:"电台",address1:"img/电台 (1).png"}]],
        ["我的音乐",[{address:"/img/喜欢.png",title:"我喜欢",address1:"img/喜欢 (1).png"},{address:"/img/电脑.png",title:"本地",address1:"img/电脑 (1).png"},{address:"/img/历史.png",title:"播放历史",address1:"img/历史 (1).png"},{address:"/img/列表 (2).png",title:"试听列表",address1:"img/列表 (3).png"}]],
    ]
    },
    
    
    methods:{
        searchMusic:function(){
            let that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.keyword).then(
                function(response){
                    
                    that.musicList = response.data.result.songs;

                    console.log(response);
                    
                    for (let index = 0; index < that.musicList.length; index++) {
                        const element = that.musicList[index];
                        that.playList[index] = element.id;
                    }
                    that.showIndex[8] = true;
                },
                function(err){}
            );
        },
        playMusic:function (musicId , arrayIndex) {
            let that = this;
            console.log(musicId);
            console.log(arrayIndex);
            if(arrayIndex<=that.playList.length){
                axios.get("https://autumnfish.cn/song/url?id="+musicId).then(
                    function(response){
                        console.log(response);                       
                                         
                        that.musicUrl = response.data.data[0].url;

                        that.indexNum = arrayIndex+1;
                    }
                );
            }else{
                that.playMusic(that.playList[0],0);
            }
        },
        selectThis:function(index1,index2){
            let num = index1*4+index2;
            for (let index = 0; index < this.showIndex.length; index++) {
                this.showIndex[index] = false;   
            }
            this.showIndex[num] = true;
            console.log(this.showIndex);
        },
        
    },
    mounted:function () {   //自动触发写入的函数
        let that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + "热榜").then(
                function(response){
                    
                    that.musicList = response.data.result.songs;

                    console.log(response);
                    
                    for (let index = 0; index < that.musicList.length; index++) {
                        const element = that.musicList[index];
                        that.playList[index] = element.id;
                    }
                    that.showIndex[8] = true;
                },
                function(err){}
            );
    }
})