export function calculateDayAndNightTemperature(hourlyData) {
    let dayTemperature = -Infinity;
    let nightTemperature = +Infinity;

    hourlyData.forEach((hourlyForecast) => {
        const hours = parseInt(hourlyForecast.time.split(':')[0]);
        const temperatureString = hourlyForecast.temperature.replace(
            /[^\d.-]/g,
            '',
        );
        const temperature = parseFloat(temperatureString);
        if (!isNaN(hours) && !isNaN(temperature)) {
            if (hours >= 6 && hours < 18) {
                dayTemperature = Math.max(dayTemperature, temperature);
            } else {
                nightTemperature = Math.min(nightTemperature, temperature);
            }
        } else {
            console.error('Invalid data format:', hourlyForecast);
        }
    });

    if (dayTemperature === -Infinity) {
        dayTemperature = null;
    }
    if (nightTemperature === +Infinity) {
        nightTemperature = null;
    }

    return { dayTemperature, nightTemperature };
}
