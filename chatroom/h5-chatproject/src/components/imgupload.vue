<template>
    <div 
    class="btn-mask">
        <input 
        id="upload"
        @change="test"
        type="file">   
        <button 

        type="submit">test</button> 
    </div>
</template>

<script>
import '../assets/css/upload.less'
export default {
    data() {
        return {

        }
    },
    methods: {
        test() {

            var input = document.getElementById("upload");
            if(input.files){
                            //读取图片数据
            var f = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload=function(){
                    var width = image.width;
                    var height = image.height;
                    console.log(width+'======'+height+"====="+f.size);
                };
                image.src= data;
            };
                reader.readAsDataURL(f);
            }else{
                var image = new Image(); 
                image.onload =function(){
                    var width = image.width;
                    var height = image.height;
                    var fileSize = image.fileSize;
                    console.log(width+'======'+height+"====="+fileSize);
                }
                image.src = input.value;
            }
        },
        upload() {
            let img = document.getElementById('upload');
            if(img.files) {
                let file = img.files[0];
                let reader = new FileReader();
                console.log(reader)
                reader.onload = function(event) {
                    console.log(1)
                    let data = event.target.result;
                    let image = new Image();
                    image.onload = function() {
                        let width = image.width;
                        let height = image.height;
                        console.log(width);
                        console.log(height)
                    }
                }
            }
        }
    }
}
</script>

