<template>
    <form @submit.prevent="handleSubmit" class="form">
        <my-input v-model="searchCity" ref="inputField" />
        <my-button type="submit">Search</my-button>
    </form>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { useWeatherStore } from './store';
export default {
    props: {
        fetchWeatherData: Function,
    },
    setup(props) {
        const weatherStore = useWeatherStore();
        const searchCity = ref('');
        const inputField = ref(null);
        const refreshInterval = ref(null);
        let submittedCity = '';

        const handleSubmit = () => {
            props.fetchWeatherData(searchCity.value);
            submittedCity = searchCity.value;
            inputField.value.$el.value = '';

            clearInterval(refreshInterval.value);
            refreshInterval.value = setInterval(() => {
                handleRefresh(submittedCity);
            }, 60000);
        };

        async function handleRefresh(city) {
            await props.fetchWeatherData(city);
        }

        onUnmounted(() => {
            clearInterval(refreshInterval.value);
        });

        return {
            searchCity,
            handleSubmit,
            inputField,
            handleRefresh,
        };
    },
};
</script>

<style scoped>
.form {
    height: 130px;
    width: 100%;
    padding: 15px 0;
    padding-top: 80px;
    display: flex;
    justify-content: center;
    opacity: 0.6;
    background: gray;
}
</style>
