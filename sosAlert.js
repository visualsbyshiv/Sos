
const form = document.getElementById('usrForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const number = document.getElementById('userNumber').value.trim();
    const gmail = document.getElementById('userGmail').value.trim();

    if (!name || !number || !gmail) {
        alert("Please fill all inputs");
        return;
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            fetch('http://192.168.1.17:3000/sos', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, number, gmail, location })
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message);
                     window.location.href = `call.html?number=${number}`;
                    const callLink = document.createElement('a');
                    callLink.href = `tel:${number}`;
                    callLink.innerText = `Call ${name} Now`;
                    callLink.className = "btn btn-danger mt-3";
                    document.body.appendChild(callLink);

                    console.log("Saved:", data);
                })
                .catch(err => {
                    console.error("Error:", err);
                });

        }, function (error) {
            alert("Location access denied or not available");
        });
    } else {
        alert("not supported by your browser");
    }
});

