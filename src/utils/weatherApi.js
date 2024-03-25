import axios from 'axios';
import { formateTemperature } from './formateTemperature';
import { useWeatherStore } from '../components/store/index';

export async function fetchCurrentData(
    city,
    yourCity,
    currentInfo,
    currentCityData,
) {
    const weatherStore = useWeatherStore();
    if (city) {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=5b73eb27d5f116481c4f845a5ff496bc`,
        );

        currentCityData.value = response.data;

        if (!yourCity.value) {
            weatherStore.setYourCity(currentCityData.value.city.name);
        }

        const currentTime = new Date(
            currentCityData.value.list[0].dt_txt,
        ).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        const icon = `https://openweathermap.org/img/wn/${currentCityData.value.list[1].weather[0].icon}.png`;
        currentInfo.value['cityName'] = currentCityData.value.city.name;
        currentInfo.value['today'] = currentTime;
        currentInfo.value['temp'] = formateTemperature(
            Math.round(currentCityData.value.list[0].main.temp),
        );

        currentInfo.value['icon'] = icon;
        currentInfo.value['description'] =
            currentCityData.value.list[1].weather[0].description;
    }
}
