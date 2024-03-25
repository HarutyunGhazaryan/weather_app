<template>
    <div class="app">
        <div class="left-container">
            <div v-if="currentInfo && currentCityData">
                <CurrentWeather
                    :currentInfo="currentInfo"
                    @refresh-clicked="handleRefresh"
                />
                <WeatherForecast
                    :currentCityData="currentCityData"
                    ref="weatherForestRef"
                />
            </div>
        </div>

        <div class="right-container">
            <div>
                <SearchForm :fetchWeatherData="fetchWeatherData" />
                <SelectedCities :fetchWeatherData="fetchWeatherData" />
            </div>
        </div>
        <my-modal class="modal" v-model:show="modalVisible">
            <h3 class="modal-title">Error</h3>
            <hr />
            <p class="modal-text">{{ errorMessage }}</p>
            <my-button class="btn-ok" @click="hideModal">Ok</my-button>
        </my-modal>
    </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, onUpdated, onBeforeUnmount } from 'vue';
import { fetchCurrentData } from './utils/weatherApi';
import CurrentWeather from './components/CurrentWeather.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import SearchForm from './components/SearchForm.vue';
import SelectedCities from './components/SelectedCities.vue';
import { useWeatherStore } from './components/store/index';

export default {
    components: {
        CurrentWeather,
        WeatherForecast,
        SearchForm,
        SelectedCities,
    },

    setup() {
        const currentCityData = ref(null);
        const currentInfo = ref({});
        const yourCity = ref('');
        const modalVisible = ref(false);
        const errorMessage = ref('');

        const fetchWeatherData = (city) => {
            const weatherStore = useWeatherStore();
            const yourCity = weatherStore.getYourCity;
            fetchCurrentData(city, yourCity, currentInfo, currentCityData)
                .then(() => {
                    localStorage.setItem(
                        'currentInfo',
                        JSON.stringify(currentInfo.value),
                    );
                    localStorage.setItem(
                        'currentCityData',
                        JSON.stringify(currentCityData.value),
                    );
                })
                .catch((error) => {
                    console.log(error);
                    showErrorModal(
                        'Please ensure that the city name is correct.',
                    );
                });
        };

        const showErrorModal = (message) => {
            errorMessage.value = message;
            modalVisible.value = true;
        };

        const hideModal = () => {
            modalVisible.value = false;
            errorMessage.value = '';
        };

        const handleRefresh = () => {
            fetchWeatherData(yourCity.value);
        };

        return {
            currentCityData,
            currentInfo,
            yourCity,
            modalVisible,
            errorMessage,
            fetchWeatherData,
            handleRefresh,
            showErrorModal,
            hideModal,
        };
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    background-image: url('/public/img/bac-1.webp');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin: 0 auto;
    height: 90vh;
    overflow: hidden;
}

.left-container {
    max-width: 65%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
}

.right-container {
    width: 35%;
    height: 90vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: flex-start;
}

.modal-title {
    margin-bottom: 10px;
}

.modal-text {
    margin-top: 10px;
    margin-bottom: 30px;
}

.btn-ok {
    padding: 10px !important;
    width: 70px;
    margin-left: 210px !important;
}
.btn-ok:hover {
    background: rgb(219, 214, 214);
}
</style>
