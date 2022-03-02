

const getProducts = async () => {
        try {
                const results = await fetch("./data/device.json");
                const data = await results.json();

                const devices = data.Devices;

                return devices;
        } catch (err) {
                console.log(err);
        }
};

const divece = document.querySelector(".main-device");
const load = window.addEventListener("DOMContentLoaded", async function () {
        var nas = localStorage.getItem('name');
        var password = localStorage.getItem('password');
        if (!nas || !password) {
                window.location.href = "http://127.0.0.1:5500/signin.html?";
        }

        const products = await getProducts();
        var total = 0;
        products.map(item => {
                total += parseInt(item.power);
        });

        displayProductItems(products);
        document.getElementsByClassName('spanTotal')[0].innerText = total;
});
const displayProductItems = items => {
        let displayProduct = items.map(divice => `
         <tr>
          <td>${divice.device}</td>
          <td>${divice.macAdress}</td>
          <td>${divice.ip}</td>
          <td>${divice.createDate}</td>
          <td>${divice.power}</td>
          <td>
          <div class="action">
          <span><i class="fa fa-trash" aria-hidden="true"></i></span>
          <span><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
        </div>
         </tr>
 `);
        displayProduct = displayProduct.join("");
        if (divece) {
                divece.innerHTML = displayProduct;
        }
}

//add DEvice
function showError(input, message) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.add("error");
        small.innerText = message;
}
function showSuccess(input) {
        let parent = input.parentElement;
        let small = parent.querySelector('small');
        parent.classList.remove("error");
        small.innerText = "";
}
function checkEmtyError(listInput) {
        let isEmtyError = false;
        listInput.forEach(input => {
                input.value = input.value.trim();
                if (!input.value) {
                        isEmtyError = true;
                        showError(input, "khong duoc de trong!");
                } else {
                        showSuccess(input);
                }
        });
        return isEmtyError;
}
var names = document.querySelector('#name');
var mac = document.querySelector('#mac');
var ip = document.querySelector('#ip')
var number = document.querySelector('#number');
var date = document.querySelector('#date');
function getRandomInt(max) {
        return Math.floor(Math.random() * max);
}
async function addDevice() {
        let isError = checkEmtyError([names, mac, ip, number, date]);
        if (!isError) {
                const products = await getProducts();
                var total = 0;
                products.map(item => {
                        total += parseInt(item.power);
                });
                const resuilt = products;
                const tmpresult = resuilt;
                newDevice = {
                        device: names.value,
                        macAdress: mac.value,
                        ip: ip.value,
                        createDate: date.value,
                        power: number.value
                };
                total += parseInt(newDevice.power);

                let background = `rgb(${getRandomInt(255)}, ${getRandomInt(255)},${getRandomInt(255)})`;
                if (newDevice) {
                        tmpresult.push(newDevice);
                        labels.push(newDevice.device);
                        backgroundColor.push(background);
                        power.push(newDevice.power)

                }
                displayProductItems(resuilt);
                document.getElementsByClassName('spanTotal')[0].innerText = total;
                names.value = "";
                mac.value = "";
                ip.value = "";
                number.value = "";
                date.value = "";
        } else {
                console.log("noooo")
        }

}
//chart
const labels = [
        'TV',
        'Washer',
        'Refigeator',
        'Seling'

];

const backgroundColor = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(255,140,0)'
];
const power = [50, 60, 80, 100]
const data = {
        labels: labels,
        datasets: [{
                label: 'My First Dataset',
                data: power,
                backgroundColor: backgroundColor,
                hoverOffset: 9
        }]
};
const config = {
        type: 'doughnut',
        data: data,
};
const myChart = new Chart(
        document.getElementById('myChart'),
        config
);

//revome device
var txtInput = document.querySelector('#deleteinput');
async function Delete() {
        var total = 0;
        const products = await getProducts();
        const resuilt = [];
        products.map(item => {
                if (txtInput.value.trim() !== item.ip) {
                        resuilt.push(item)
                }
        });
        resuilt.map(item => {
                total += parseInt(item.power);
        });
        displayProductItems(resuilt);
        document.getElementsByClassName('spanTotal')[0].innerText = total;
}

/**  */
function toggleMenu() {
        let toggle = document.querySelector(".toggle");
        let navigation = document.querySelector(".navigation");
        let main = document.querySelector(".main");
        toggle.classList.toggle("active");
        navigation.classList.toggle("active");
        main.classList.toggle("active");

}
function SignOut() {
        localStorage.removeItem("name");
        localStorage.removeItem("password");
        window.location.href = "http://127.0.0.1:5500/signin.html?"
}