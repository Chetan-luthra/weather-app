const weatherForm = document.querySelector('form');
const search = document.querySelector('.SearchCountry');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const country = search.value;
    fetch('http://localhost:3000/weather?address=' + country).then((response) => {
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