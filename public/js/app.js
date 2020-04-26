const weatherForm = document.querySelector('form');
const search = document.querySelector('.SearchCountry');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const currentLocation = document.querySelector('#currentLocation')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const country = search.value;
    fetch('/weather?address=' + country).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = " ";
            }
            else{
                const summary = 'It is ' + data.summary + " and the Temperature there is " +  data.temperature + " and possibility of rain is " + data.possibility + "%."
                messageOne.textContent = data.location;
                messageTwo.textContent = summary;
            }
        })
    })
})
currentLocation.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        latitude= position.coords.latitude
        longitude=  position.coords.longitude
        const locationPath = `/currentLocationMethod?latitude=${latitude}&longitude=${longitude}`
        fetch(locationPath).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error;
                    messageTwo.textContent = " ";
                }
                else{
                    const summary = 'It is ' + data.summary + " and the Temperature there is " +  data.temperature + " and possibility of rain is " + data.possibility + "%."
                    messageOne.textContent = "current Location";
                    messageTwo.textContent = summary;
                }
            })
        })
    })
})