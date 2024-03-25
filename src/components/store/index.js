import { defineStore } from 'pinia';

export const useWeatherStore = defineStore({
    id: 'weather',
    state: () => ({
        cities: [],
        yourCity: '',
        showHourlyData: true,
    }),
    getters: {
        getCities: (state) => state.cities,
        getYourCity: (state) => state.yourCity,
        getShowHourlyData: (state) => state.showHourlyData,
    },
    actions: {
        initializeFromLocalStorage() {
            const storedCities = localStorage.getItem('cities');
            const storedYourCity = localStorage.getItem('yourCity');
            const storedShowHourlyData = localStorage.getItem('showHourlyData');

            if (storedCities) {
                this.cities = JSON.parse(storedCities);
            }

            if (storedYourCity) {
                this.yourCity = storedYourCity;
            }

            if (storedShowHourlyData) {
                this.showHourlyData = JSON.parse(storedShowHourlyData);
            }
        },

        addCity(city) {
            this.cities.push(city);
            localStorage.setItem('cities', JSON.stringify(this.cities));
        },

        setYourCity(city) {
            if (!this.yourCity) {
                this.yourCity = city;
                localStorage.setItem('yourCity', this.yourCity);
            }
        },

        deleteCity(cityName) {
            const index = this.cities.indexOf(cityName);
            if (index !== -1) {
                this.cities.splice(index, 1);
                localStorage.setItem('cities', JSON.stringify(this.cities));
            }
        },

        changeShowHourlyData(value) {
            this.showHourlyData = value;
            localStorage.setItem(
                'showHourlyData',
                JSON.stringify(this.showHourlyData),
            );
        },
    },
});
