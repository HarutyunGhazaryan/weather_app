<template>
    <input
        type="text"
        class="input"
        :placeholder="placeholder"
        v-model="searchCity"
        ref="inputField"
        @input="emitCityName"
    />
</template>

<script>
export default {
    name: 'my-input',
    props: {
        yourCity: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            searchCity: '',
        };
    },
    computed: {
        placeholder() {
            return this.searchCity
                ? 'Search city'
                : this.yourCity
                ? 'Search city'
                : 'Your city';
        },
    },
    methods: {
        emitCityName() {
            this.$emit('input', this.searchCity);
        },
        resetInput() {
            this.searchCity = '';
        },
    },
};
</script>

<style>
.input {
    border-radius: 10px;
    max-width: 100%;
    padding-left: 8px;
    font-size: 18px;
    border: 2px solid white;
    box-sizing: border-box;
}
</style>
