import { createApp } from 'vue';
import App from './App.vue';
import components from './components/UI';
import { createPinia } from 'pinia';
import { useWeatherStore } from './components/store';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const weatherStore = useWeatherStore();

weatherStore.initializeFromLocalStorage();

components.forEach((component) => {
    app.component(component.name, component);
});

app.mount('#app');
