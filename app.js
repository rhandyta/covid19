const baseUrl = "http://localhost:3000/update";
// const baseUrl =
//     "https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/update.json";
const positif = document.querySelector("#jumlah_positif");
const dirawat = document.querySelector("#jumlah_dirawat");
const sembuh = document.querySelector("#jumlah_sembuh");
const meninggal = document.querySelector("#jumlah_meninggal");
const result = [];
const month = [];
const obj1 = {};
const bpositif = {};
const bsembuh = {};
const bmeninggal = {};
const bdirawat = {};
function numFormat(value) {
    return value.toLocaleString();
}

// function filterDateTime(result) {
//     let year = [];
//     // let month = [];
//     for (let date of result) {
//         const d = new Date(date.key_as_string.toLocaleString());
//         year.push(d.getFullYear());
//         // month.push(d.getMonth());
//     }
//     let uniqYear = [...new Set(year)];
//     // let uniqMonth = [...new Set(month)];
//     years["years"] = [...uniqYear];
//     // months.push(...uniqMonth);
// }

const fetchTotalCovid = async () => {
    const headers = { headers: { "Content-Type": "application/json" } };
    try {
        const res = await fetch(`${baseUrl}`, headers);
        let update = await res.json();
        positif.textContent = numFormat(update.total.jumlah_positif);
        dirawat.textContent = numFormat(update.total.jumlah_dirawat);
        sembuh.textContent = numFormat(update.total.jumlah_sembuh);
        meninggal.textContent = numFormat(update.total.jumlah_meninggal);
        Object.assign(result, update);
        // filterDateTime(result.harian);
        totalFiltered(result.harian);
    } catch (e) {
        return e.message;
    }
};

const getDayInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

const totalFiltered = async (result) => {
    const collection = result.map((x) => ({
        ...x,
        day: new Date(x.key_as_string).toISOString().split("T")[0],
        jumlah_positif: Number(x.jumlah_positif.value),
        jumlah_sembuh: Number(x.jumlah_sembuh.value),
        jumlah_meninggal: Number(x.jumlah_meninggal.value),
        jumlah_dirawat: Number(x.jumlah_dirawat.value),
    }));
    const mapDayToMonth = collection.map((x) => ({
        ...x,
        day: new Date(x.day).getMonth(),
        year: new Date(x.key_as_string).getFullYear(),
        month: new Date(x.key_as_string).toLocaleString("id-ID", {
            month: "long",
        }),
    }));

    const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
        if (cur.year === 2022) {
            acc[cur.day] =
                acc[cur.day] + cur.jumlah_positif || cur.jumlah_positif;
        }

        return acc;
    }, {});
    console.log(sumPerMonth);
    console.log(mapDayToMonth);
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: [1, 2, 4, 5, 6, 7, 8, 9, 10],
            datasets: [
                {
                    label: "Positif",
                    data: sumPerMonth,
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
};

// const totalFiltered = (result) => {
//     let datas = [];
//     for (let i = 0; i < result.harian.length; i++) {
//         let date = new Date(result.harian[i].key_as_string);
//         if (
//             date.getDate() <=
//             getDayInMonth(date.getFullYear(), date.getMonth() + 1)
//         ) {
//             if (date.getFullYear() === date.getFullYear()) {
//                 datas[
//                     date.toLocaleString("id-ID", { month: "long" }) +
//                         " " +
//                         date.getFullYear() +
//                         " jumlah_positif"
//                 ] = result.harian[i].jumlah_positif.value;
//                 datas[
//                     date.toLocaleString("id-ID", { month: "long" }) +
//                         " " +
//                         date.getFullYear() +
//                         " jumlah_meninggal"
//                 ] = result.harian[i].jumlah_meninggal.value;
//                 datas[
//                     date.toLocaleString("id-ID", { month: "long" }) +
//                         " " +
//                         date.getFullYear() +
//                         " jumlah_sembuh"
//                 ] = result.harian[i].jumlah_sembuh.value;
//                 datas[
//                     date.toLocaleString("id-ID", { month: "long" }) +
//                         " " +
//                         date.getFullYear() +
//                         " jumlah_dirawat"
//                 ] = result.harian[i].jumlah_dirawat.value;
//             }
//         }
//     }
//     month.push(datas);
//     console.log(month);
// };
fetchTotalCovid();

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
