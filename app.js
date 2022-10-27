const baseUrl = "http://localhost:3000/update";
// const baseUrl =
//     "https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/update.json";
const positif = document.querySelector("#jumlah_positif");
const dirawat = document.querySelector("#jumlah_dirawat");
const sembuh = document.querySelector("#jumlah_sembuh");
const meninggal = document.querySelector("#jumlah_meninggal");
const result = {};
const years = [];
const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

function numFormat(value) {
    return value.toLocaleString();
}

function getDateTime(result) {
    let year = [];
    for (let month of result) {
        const d = new Date(month.key_as_string.toLocaleString());
        year.push(d.getFullYear());
    }
    let uniqYear = [...new Set(year)];
    years.push(...uniqYear);
}
console.log(years);
const fetchTotalCovid = async () => {
    try {
        const res = await fetch(`${baseUrl}`);
        let update = await res.json();
        positif.textContent = numFormat(update.total.jumlah_positif);
        dirawat.textContent = numFormat(update.total.jumlah_dirawat);
        sembuh.textContent = numFormat(update.total.jumlah_sembuh);
        meninggal.textContent = numFormat(update.total.jumlah_meninggal);
        Object.assign(result, update);
        getDateTime(result.harian);
    } catch (e) {
        return e.message;
    }
};

fetchTotalCovid();
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: month,
        datasets: [
            {
                label: "Positif",
                data: [5, 3, 3, 20, 10, 45, 74, 3],
                backgroundColor: ["rgba(0, 0, 255)"],
                borderColor: ["rgba(0, 0, 255)"],
                borderWidth: 1,
            },
            {
                label: "Dirawat",
                data: [31, 5, 43, 72, 34, 64, 64, 43],
                backgroundColor: ["rgba(246, 255, 0)"],
                borderColor: ["rgba(246, 255, 0)"],
                borderWidth: 1,
            },
            {
                label: "Sembuh",
                data: [43, 35, 34, 46, 52, 66, 27, 28],
                backgroundColor: ["rgba(47, 255, 0)"],
                borderColor: ["rgba(47, 255, 0)"],
                borderWidth: 1,
            },
            {
                label: "Meninggal",
                data: [16, 24, 32, 43, 59, 69, 78, 88],
                backgroundColor: ["rgba(255, 0, 0)"],
                borderColor: ["rgba(255, 0, 0)"],
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

const ctx1 = document.getElementById("myChart1");
const myChart1 = new Chart(ctx1, {
    type: "line",
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});
