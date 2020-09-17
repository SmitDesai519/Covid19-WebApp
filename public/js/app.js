function getCity() {
    let output = document.getElementById('output');
    output.innerHTML = 'loading'
    let city = document.getElementById('city').value;
    city=city.toLowerCase()
    htm = "";
    fetch('/covid19?city='+city).then(response => {
        response.json().then(data => {
            if (data.error) {
                htm = "Enter valid city"
                output.innerHTML = htm;
            }
            else {
                console.log('how')
                htm = '<h3>' + data.city + ' Covid19 Details:</h3>'
                htm += '<h4>City : ' + data.city + '<br>Confirmed : ' + data.data.confirmed + 
                        '<br>Active : ' + data.data.active + 
                        '<br>Deceased : ' + data.data.deceased + 
                        '<br>Recovered : ' + data.data.recovered + '</h4>'
                output.innerHTML = htm;
            }
        })
    })
}

