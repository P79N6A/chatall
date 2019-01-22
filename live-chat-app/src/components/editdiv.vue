<template>
	<div 
    :id="id" class="message" contenteditable="true" v-html="innerText" 
    @keydown.prevent.shift.enter.exact="addBlank"
    @keydown.prevent.enter.exact="emitSend" 
    @input="changeText" 
    @focus="focusEvent" 
    @blur="blurEvent"></div>
</template>
<script>
    import Util from '@/utils/util'
	export default {
        props: ['value','id'],
        data(){
            return {
            	innerText:this.value,
                isLocked:false,
            }
        },
        watch: {
            'value'(){
                if (!this.isLocked) {
                    this.innerText = this.value;
                }
            }
        },
        mounted(){
            var that = this;
            this.$root.eventHub.$on("clearDivEvent",id=>{
                document.getElementById(id).innerHTML='';
            });
            this.$root.eventHub.$on("inputDivEvent",item=>{
                document.getElementById(item.id).innerHTML=item.message;
            });
        },
        methods:{
            addBlank() {
                this.$el.innerHTML +=  '<br>';
                let len = this.$el.innerHTML.length;
                this.$el.focus();
                if (document.selection) { 
                    let sel = document.selection.createRange(); 
                    sel.moveStart('character',len); 
                    sel.collapse(); 
                    sel.select(); 
                } 
                else{                                              
                    let sel = window.getSelection();
                    let range = document.createRange();
                    range.selectNodeContents(this.$el);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } 
            },
			emitSend(e) {
                // this.$toast.center('您正在使用enter发送消息，换行请按shift+enter','center');
                e.preventDefault();
                this.$emit('childEmit', false);
            },
            changeText(){
                this.$emit('input',this.$el.innerHTML);
            },
            focusEvent(e){
                this.isLocked = true;
            },
            blurEvent(e){
                this.isLocked = false;
            }
        }
    }
</script>