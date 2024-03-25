<template>
    <div class="container">
        <ul class="day-container">
            <li
                v-for="(dayDat, date) in dailyData"
                :key="date"
                class="day"
                @click="
                    showHourlyForecasts(date);
                    selectDay(date);
                "
            >
                <h3>{{ date }}</h3>
                <p class="day-temp">
                    {{
                        dayDat.dayTemperature !== 'null °C'
                            ? dayDat.dayTemperature
                            : ''
                    }}
                </p>
                <p>
                    {{
                        dayDat.nightTemperature !== 'null °C'
                            ? dayDat.nightTemperature
                            : ''
                    }}
                </p>
                <img :src="dayDat.icon" />
                <p>{{ dayDat.description }}</p>
            </li>
        </ul>
        <div
            v-if="selectedDate && daySelected && showHourlyData"
            class="hourly-container"
        >
            <ul>
                <li
                    class="hour"
                    v-for="hourDat in hourlyData"
                    :key="hourDat.time"
                >
                    <h3>{{ hourDat.time }}</h3>
                    <p>{{ hourDat.temperature }}</p>
                    <img :src="hourDat.icon" />
                    <p>{{ hourDat.description }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from 'vue';
import { formatDate } from '../utils/formatDate';
import { calculateDayAndNightTemperature } from '../utils/calculateDayAndNightTemperature';
import { formateTemperature } from '../utils/formateTemperature';
import { useWeatherStore } from './store/index';

export default {
    props: {
        currentCityData: Object,
    },
    setup(props) {
        let dailyData = reactive({});
        let hourlyData = ref([]);
        let selectedDate = ref(null);
        let daySelected = ref(false);
        let currentDay = ref('');
        const weatherStore = useWeatherStore();
        const showHourlyData = computed(() => weatherStore.getShowHourlyData);

        const showHourlyForecasts = (date) => {
            weatherStore.changeShowHourlyData(true);

            const hourlyForecasts = parseHourlyForecasts();

            for (const hourlyForecast in hourlyForecasts) {
                if (formatDate(hourlyForecast) === date) {
                    hourlyData.value = hourlyForecasts[hourlyForecast];
                    selectedDate.value = date;
                }
            }
        };

        const selectDay = (date) => {
            if (currentDay.value !== date) {
                currentDay.value = date;
                daySelected.value = true;
            } else {
                daySelected.value = false;
                currentDay.value = false;
            }
        };

        function parseHourlyForecasts() {
            const forecastData = props.currentCityData
                ? props.currentCityData.list
                : [];
            const hourlyForecasts = {};

            forecastData.forEach((item) => {
                const date = item.dt_txt.split(' ')[0];
                const time = item.dt_txt.split(' ')[1].slice(0, 5);

                if (!hourlyForecasts[date]) {
                    hourlyForecasts[date] = [];
                }
                const weather = item.weather && item.weather[0];

                const icon = weather
                    ? `https://openweathermap.org/img/wn/${weather.icon}.png`
                    : '';
                const description = weather ? weather.description : '';
                const temperature = formateTemperature(
                    Math.round(item.main.temp),
                );
                hourlyForecasts[date].push({
                    time: time,
                    temperature: temperature,
                    icon: icon,
                    description: description,
                });
            });

            return hourlyForecasts;
        }

        async function parseDailyForecasts() {
            const hourlyForecasts = parseHourlyForecasts();

            for (const date in hourlyForecasts) {
                const hourlyData = hourlyForecasts[date];

                const { dayTemperature, nightTemperature } =
                    calculateDayAndNightTemperature(hourlyData);

                const icon = hourlyData[0].icon;
                const description = hourlyData[0].description;

                dailyData[formatDate(date)] = {
                    dayTemperature: formateTemperature(dayTemperature),
                    nightTemperature: formateTemperature(nightTemperature),
                    icon,
                    description,
                };
            }
        }

        watch(
            () => props.currentCityData,
            (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    parseDailyForecasts();
                }
            },
        );
        onMounted(parseDailyForecasts);

        return {
            dailyData,
            hourlyData,
            selectedDate,
            daySelected,
            showHourlyData: showHourlyData,
            showHourlyForecasts,
            selectDay,
        };
    },
};
</script>

<style scoped>
.day-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
    max-width: 100%;
}

.day-container li {
    list-style: none;
    margin-right: 20px;
    width: 200px;
    height: 180px;
    opacity: 0.8;
}

.day-container li:hover {
    opacity: 1;
}

.day-container li:active {
    transform: scale(0.95);
}

.day-container li:last-child {
    margin-right: 0;
}

.day-container li img {
    display: block;
    margin: 0 auto;
}

.day-container li h3,
.day-container li p,
.day-container li p {
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 5px;
}

.day-temp {
    font-size: 18px;
    font-weight: bold;
}

.day {
    background-image: url('/public/img/bac-1.webp');
    display: inline-block;
    border: 1px gray solid;
    margin-bottom: 20px;
    margin-top: 50px;
    color: white;
    max-width: 100px;
    max-height: 300px;
}

.hourly-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.hourly-container ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
}

.hourly-container ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url('/public/img/bac-1.webp');
    display: inline-block;
    opacity: 0.8;
    border: 1px gray solid;
    width: 70px;
    margin: 10px;
    padding: 6px;
    color: white;
}

.hourly-container li:last-child {
    margin-right: 0px;
    border: 1px gray solid;
    margin: 10px;
    color: white;
}

.hourly-container li h3,
.hourly-container li p {
    display: flex;
    justify-content: center;
    text-align: center;
}

.hourly-container li img {
    display: block;
    margin: 0 auto;
    align-self: center;
}

@media screen and (max-width: 768px) {
    .left-container {
        max-width: 100%;
        align-items: flex-start;
    }
}
</style>
