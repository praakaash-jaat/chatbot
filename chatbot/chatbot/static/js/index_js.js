fetch('/process_data/?data=test')
    .then(response => response.json())
    .then(responseData => console.log(responseData));