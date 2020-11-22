<template>
<div class="more">
    {{more}}
</div>
</template>

<script>
export default {
    props: {
        more: String
    },
}
</script>

<style scoped>
.more {
    color: #D92B51;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border: 1px solid #D92B51;
    border-radius: 5px;
}
</style>
