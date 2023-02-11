export async function getEuroRate() {
    let rate;
    await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', {
            method: 'get'
        })
        .then(res => res.json())
        .then(res => {
            rate = res.find(rate => rate.cc === "EUR");
        })
        .catch(res => {
            console.log(res);
        });

    return rate;
}

