<template>
    <div class="modal" v-if="show">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-modal',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    display: flex;
    z-index: 2;
}

.modal-content {
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    max-width: 450px;
    padding: 20px;
    color: black;
}
</style>
