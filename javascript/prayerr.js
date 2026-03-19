
let prayerTimes = {};
const adhanAudio = document.getElementById("adhanAudio");

function unlockAudio() {
    adhanAudio.play().then(() => {
        adhanAudio.pause();
        adhanAudio.currentTime = 0;
    }).catch(console.log);
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
}
document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const api_url = `https://api.aladhan.com/v1/timings/${date}-${month}-${year}?latitude=${lat}&longitude=${long}&method=3&timezonestring=Africa/Lagos`;

    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        const timings = data.data.timings;
        prayerTimes = {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha
        };
        document.getElementById("fajr").textContent = timings.Fajr;
        document.getElementById("dhuhr").textContent = timings.Dhuhr;
        document.getElementById("asr").textContent = timings.Asr;
        document.getElementById("maghrib").textContent = timings.Maghrib;
        document.getElementById("isha").textContent = timings.Isha;
    })
    .catch(err => console.log(err));
});

function checkPrayerTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    for (let prayer in prayerTimes) {
        let [hour, minute] = prayerTimes[prayer].split(":").map(Number);
        if (currentHour === hour && currentMinute === minute) {
            if (adhanAudio.paused) {
                adhanAudio.play().catch(console.log);
            }
        }
    }
}

setInterval(checkPrayerTime, 20000);
