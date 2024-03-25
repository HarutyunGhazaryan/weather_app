<template>
    <div>
        <div class="cities">
            <div v-if="yourCity">
                <h3>Your city</h3>
                <city-item
                    @click="
                        changeCity(yourCity);
                        fetchWeatherData(yourCity);
                    "
                    >{{ yourCity }}
                </city-item>
            </div>

            <h3>Selected cities</h3>
            <hr />
            <div v-if="cities.length">
                <city-item
                    class="city-item-content"
                    @click="
                        changeCity(city);
                        fetchWeatherData(city);
                    "
                    v-for="city in cities"
                    :key="city.name"
                >
                    {{ city }}

                    <my-button class="delete-city" @click.stop="showModal(city)"
                        >Delete</my-button
                    >
                </city-item>
            </div>
            <p v-else class="selected-city-text">Cities not selected</p>
        </div>
    </div>

    <my-modal class="modal" v-model:show="modalVisible">
        <h3 class="modal-title">Delete city?</h3>
        <hr />
        <p class="modal-text">
            Are you sure you want to remove this city from your selected cities?
        </p>
        <div class="btn-modal">
            <my-button @click="hideModal" class="btn-cancel">Cancel</my-button>
            <my-button @click="deleteCity" class="btn-delete">Delete</my-button>
        </div>
    </my-modal>
</template>

<script>
import { ref, watch } from 'vue';
import { useWeatherStore } from './store/index.js';
import MyModal from './UI/MyModal.vue';

export default {
    components: { MyModal },
    props: {
        fetchWeatherData: Function,
        changeDaySelected: Function,
    },
    setup(props) {
        const weatherStore = useWeatherStore();
        const cities = weatherStore.getCities;
        const yourCity = ref(weatherStore.getYourCity);
        const modalVisible = ref(false);
        const deleteCityName = ref(null);

        watch(
            () => weatherStore.getYourCity,
            (newValue) => {
                if (!yourCity.value) {
                    yourCity.value = newValue;
                }
            },
        );
        function changeCity(city) {
            weatherStore.changeShowHourlyData(false);
            props.fetchWeatherData(city);
        }

        const showModal = (city) => {
            deleteCityName.value = city;
            modalVisible.value = true;
        };

        const hideModal = () => {
            modalVisible.value = false;
        };

        function deleteCity() {
            weatherStore.deleteCity(deleteCityName.value);
            hideModal();
        }

        return {
            yourCity,
            cities,
            modalVisible,
            changeCity,
            showModal,
            hideModal,
            deleteCity,
        };
    },
};
</script>

<style scoped>
.cities {
    color: white;
    font-size: 20px;
    padding-bottom: 40px;
    opacity: 0.6;
    background: gray;
    padding: 0 45px;
    height: 100vh;
    padding-top: 20px;
}
.cities h3 {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
hr {
    margin-bottom: 15px;
}
.city-item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: auto;
}
.city-item-content button {
    padding: 7px;
}
.delete-city {
    justify-content: flex-end;
}
.selected-city-text {
    margin-top: 10px;
    text-align: center;
}

.modal {
    opacity: 1;
}

.modal-title {
    margin-bottom: 10px;
}

.modal-text {
    margin-top: 10px;
    margin-bottom: 30px;
}

.btn-cancel,
.btn-delete {
    padding: 10px !important;
    margin-right: 15px;
}

.btn-cancel {
    margin-left: 220px !important;
}

.btn-cancel:hover {
    background: rgb(219, 214, 214);
}

.btn-delete {
    background-color: red;
    color: white;
}
.btn-delete:hover {
    background-color: rgb(187, 23, 23);
}
</style>
