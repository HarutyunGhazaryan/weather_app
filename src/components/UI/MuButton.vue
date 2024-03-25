<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button',
    props: {
        btnText: {
            type: String,
        },
    },
};
</script>

<style scoped>
.btn {
    border-radius: 10px;
    max-width: 70px;
    padding: 0 5px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}
</style>
