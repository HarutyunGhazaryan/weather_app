<template>
    <div class="city-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'city-item',
};
</script>

<style>
.city-item {
    background: rgb(rgb(55 65 81));
    border: 1px solid white;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    margin: 10px 0;
    border-radius: 10px;
    background-color: rgb(82, 78, 78);
    opacity: 0.6;
    cursor: pointer;
}

.city-item:hover {
    background-color: white;
    color: black;
}
</style>
