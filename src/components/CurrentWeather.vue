<template>
    <div>
        <div class="container">
            <a
                class="addCity"
                :class="{ cityAdded: cityAdded }"
                href="#"
                @click="addToSelectedCities"
            >
                {{
                    yourCity !== currentInfo.cityName
                        ? 'Add to Selected Cities'
                        : ''
                }}
            </a>
        </div>
        <div class="current-info" :class="{ 'current-info2': showAddCity }">
            <div class="city-data">
                <p>{{ currentInfo1.temp }}</p>
            </div>
            <div class="temp">
                <p>{{ currentInfo1.cityName }}</p>
                <p>{{ currentInfo1.today }}</p>
            </div>
            <img :src="currentInfo1.icon" />
            <p class="description">{{ currentInfo1.description }}</p>
            <i class="fas fa-sync-alt" @click="handleRefresh"></i>
        </div>
    </div>
</template>

<script>
import { ref, watch, onBeforeMount, reactive } from 'vue';
import { useWeatherStore } from './store/index.js';

export default {
    props: {
        currentInfo: Object,
    },
    emits: ['refresh-clicked'],

    setup(props, { emit }) {
        const weatherStore = useWeatherStore();
        const yourCity = weatherStore.getYourCity;
        let showAddCity = ref(true);
        let cityAdded = ref(true);
        const currentInfo1 = reactive({});

        (currentInfo1.value = JSON.parse(localStorage.getItem('currentInfo'))),
            onBeforeMount(() => {
                setTimeout(() => {
                    const data = JSON.parse(
                        localStorage.getItem('currentInfo'),
                    );
                    Object.assign(currentInfo1, data);
                }, 0);
            });

        function loadDataFromLocalStorage() {
            setTimeout(() => {
                const data = JSON.parse(localStorage.getItem('currentInfo'));
                Object.assign(currentInfo1, data);
            }, 0);
        }
        watch(props.currentInfo, (newValue, oldValue) => {
            loadDataFromLocalStorage();
            const cityName = newValue.cityName;
            showAddCity.value = cityName !== weatherStore.getYourCity;
            if (
                cityName !== weatherStore.getYourCity &&
                !weatherStore.getCities.includes(cityName)
            ) {
                cityAdded.value = false;
            }
        });

        const handleRefresh = () => {
            emit('refresh-clicked');
        };

        const addToSelectedCities = () => {
            const cityName = props.currentInfo.cityName;
            if (
                cityName !== props.yourCity &&
                !weatherStore.getCities.includes(cityName)
            ) {
                weatherStore.addCity(cityName);
                cityAdded.value = true;
            }
        };

        return {
            yourCity,
            addToSelectedCities,
            handleRefresh,
            currentInfo1,
            showAddCity,
            cityAdded,
        };
    },
};
</script>

<style scope>
.addCity {
    display: flex;
    justify-content: center;
    color: white;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.2rem;
    margin-top: 30px;
}

.addCity:active {
    transform: scale(0.95);
}

.cityAdded:active {
    transform: none;
}
.current-info {
    display: flex;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    font-size: 2rem;
    font-weight: bolder;
    color: white;
    opacity: 0.9;
    margin-bottom: 0;
    margin-top: 20px;
}
.current-info2 {
    display: flex;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    margin: 0 50px;
    font-size: 2rem;
    font-weight: bolder;
    color: white;
    opacity: 0.9;
    margin-bottom: 0;
}

.current-info img {
    height: 120px;
}

.city-data {
    font-size: 3rem;
    min-width: 160px;
}

.temp p {
    display: flex;
    justify-content: center;
}

.fas {
    margin-left: 20px;
    cursor: pointer;
}

.fas:active {
    transform: scale(0.9);
}

.city-data > .data {
    font-size: 1.5rem;
}

.temp {
    margin: 0 30px;
    width: 160px;
}

.description {
    font-size: 1.5rem;
}
</style>
