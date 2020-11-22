<template>
<div class="tag">
    <h1>{{tagData.title}}</h1>
    <p>{{tagData.tag}}</p>
</div>
</template>

<script>
export default {
    props: {
        tagData: Object
    }
}
</script>

<style lang="less" scoped>
.tag {
    width: 100%;
    padding: 10px auto;
    margin-bottom: 20px;
    letter-spacing: 1px;

    h1 {
        color: #333;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    p {
        color: #444;
        font-size: 16px;
    }
}
</style>
