export function formateTemperature(temperature) {
    return (temperature =
        temperature === 0
            ? temperature + ' °C'
            : temperature > 0
            ? '+ ' + temperature + ' °C'
            : temperature + ' °C');
}
