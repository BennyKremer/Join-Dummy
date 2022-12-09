setURL("https://gruppe-373.developerakademie.net/smallest_backend_ever");
tasks = getArrayFromBackend('tasks');

async function getDaytime() {
    let url = 'https://worldtimeapi.org/api/timezone/Europe/Berlin';
    let response = await fetch(url);
    let responseJSON = await response.json();
    let datetime = responseJSON['datetime'];
    let hour = datetime.slice(11,13);
    let minute = datetime.slice(14,16);
    let time = hour + minute;
    generateGreeting(time);
}


function generateGreeting(time) {
    let greeting = [];
    if (time > 1200 && time < 1800) {
        greeting.push('Good afternoon');
    }
    else if (time > 1800 && time < 2400) {
        greeting.push('Good evening');
    }
    else if (time > 0000 && time < 1200) {
        greeting.push('Good morning');
    }
    let greet = greeting[0];
    console.log(greet);
    document.getElementById('summarySalutation').innerHTML = `${greet},`;
}