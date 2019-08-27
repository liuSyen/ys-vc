<template>
    <div class="free-buttons" :type="type">
    </div>
</template>

<script>
export default {
    name: 'YButton',
    data () {
        return {
            aaa: ''
        }
    },
    props: {
        type: String
    },
    mounted () {
        if (this.type) {
            console.log(this.type)
            this.aaa = 'test'
            console.log(this.aaa)
        }
    }
}
</script>

<style scoped>
    .free-buttons {
        width: 100%;
        height: 30px;
        background: #fc4949;
    }
</style>
