const baseUrl = "http://localhost:3000/update";
// const baseUrl =
//     "https://cors-anywhere.herokuapp.com/https://data.covid19.go.id/public/api/update.json";
const positif = document.querySelector("#jumlah_positif");
const dirawat = document.querySelector("#jumlah_dirawat");
const sembuh = document.querySelector("#jumlah_sembuh");
const meninggal = document.querySelector("#jumlah_meninggal");
const lastUpdatedKasus = document.querySelector("#kasus");
const lastUpdatedVaksin = document.querySelector("#vaksin");
const vaksin1 = document.querySelector("#vaksin1");
const vaksin2 = document.querySelector("#vaksin2");
const year = new Date();
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
        lastUpdatedKasus.textContent = `Sumber: covid19.go.id / Selama tahun: ${year.getFullYear()} / Last update: ${
            update.penambahan.tanggal
        }`;
        Object.assign(result, update);
        // filterDateTime(result.harian);
        totalFiltered(result.harian);
    } catch (e) {
        console.log(e.message);
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
        jumlah_meninggal: Number(x.jumlah_meninggal.value),
        jumlah_sembuh: Number(x.jumlah_sembuh.value),
        jumlah_dirawat: Number(x.jumlah_dirawat.value),
    }));
    const mapDayToMonth = collection.map((x) => ({
        ...x,
        day: new Date(x.day).getMonth(),
        year: new Date(x.key_as_string).getFullYear(),
    }));

    const sumPerMonthPositif = mapDayToMonth.reduce((acc, cur) => {
        let year = new Date("2022"); // mendapatkan nilai sesuai dengan tahun sekarang
        if (cur.year === year.getFullYear()) {
            acc[cur.day] =
                acc[cur.day] + cur.jumlah_positif || cur.jumlah_positif;
        }

        return acc;
    }, {});
    const sumPerMonthMeninggal = mapDayToMonth.reduce((acc, cur) => {
        let year = new Date();
        if (cur.year === year.getFullYear()) {
            acc[cur.day] =
                acc[cur.day] + cur.jumlah_meninggal || cur.jumlah_meninggal;
        }

        return acc;
    }, {});
    const sumPerMonthSembuh = mapDayToMonth.reduce((acc, cur) => {
        let year = new Date();
        if (cur.year === year.getFullYear()) {
            acc[cur.day] =
                acc[cur.day] + cur.jumlah_sembuh || cur.jumlah_sembuh;
        }

        return acc;
    }, {});
    const sumPerMonthDirawat = mapDayToMonth.reduce((acc, cur) => {
        let year = new Date();
        if (cur.year === year.getFullYear()) {
            acc[cur.day] =
                acc[cur.day] + cur.jumlah_dirawat || cur.jumlah_dirawat;
        }

        return acc;
    }, {});
    const monthNum = Object.keys(sumPerMonthPositif);
    const monthNumPlusOne = [];
    const monthResult = [];
    for (let j = 0; j < monthNum.length; j++) {
        monthNumPlusOne.push(parseInt(monthNum[j]) + 1);
    }
    for (let i = 0; i < monthNum.length; i++) {
        let montthhhh = new Date(`${monthNumPlusOne[i]}`);
        monthResult.push(montthhhh.toLocaleString("id-ID", { month: "long" }));
    }
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: monthResult,
            datasets: [
                {
                    label: "Positif",
                    data: Object.values(sumPerMonthPositif),
                    backgroundColor: ["rgba(0, 0, 255)"],
                    borderColor: ["rgba(0, 0, 255)"],
                    borderWidth: 1,
                },
                {
                    label: "Meninggal",
                    data: Object.values(sumPerMonthMeninggal),
                    backgroundColor: ["rgba(255, 0, 0, 1)"],
                    borderColor: ["rgba(255, 0, 0, 1)"],
                    borderWidth: 1,
                },
                {
                    label: "Sembuh",
                    data: Object.values(sumPerMonthSembuh),
                    backgroundColor: ["rgba(61, 255, 0, 1)"],
                    borderColor: ["rgba(61, 255, 0, 1)"],
                    borderWidth: 1,
                },
                {
                    label: "Dirawat",
                    data: Object.values(sumPerMonthDirawat),
                    backgroundColor: ["rgba(252, 255, 0, 1)"],
                    borderColor: ["rgba(252, 255, 0, 1)"],
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

const fetchTotalVaksin = async () => {
    try {
        let response = await fetch("http://localhost:3001/vaksinasi");
        let data = await response.json();
        vaksin1.textContent = numFormat(data.total.jumlah_vaksinasi_1);
        vaksin2.textContent = numFormat(data.total.jumlah_vaksinasi_2);
        let { harian } = data;
        lastUpdatedVaksin.textContent = `Sumber: covid19.go.id / Selama tahun: ${year.getFullYear()} / Last update: ${
            data.penambahan.tanggal
        }`;
        const collection = harian.map((x) => ({
            ...x,
            day: new Date(x.key_as_string).toISOString().split("T")[0],
            jumlah_vaksinasi_1: Number(x.jumlah_vaksinasi_1.value),
            jumlah_vaksinasi_2: Number(x.jumlah_vaksinasi_2.value),
        }));

        const mapDayToMonth = collection.map((x) => ({
            ...x,
            day: new Date(x.day).getMonth(),
            year: new Date(x.key_as_string).getFullYear(),
        }));

        const sumPerMonthVaksin1 = mapDayToMonth.reduce((acc, cur) => {
            let year = new Date("2022"); // nilai sesuai tahun sekarang
            if (cur.year === year.getFullYear()) {
                acc[cur.day] =
                    acc[cur.day] + cur.jumlah_vaksinasi_1 ||
                    cur.jumlah_vaksinasi_1;
            }
            return acc;
        }, {});
        const sumPerMonthVaksin2 = mapDayToMonth.reduce((acc, cur) => {
            let year = new Date("2022"); // nilai sesuai tahun sekarang
            if (cur.year === year.getFullYear()) {
                acc[cur.day] =
                    acc[cur.day] + cur.jumlah_vaksinasi_2 ||
                    cur.jumlah_vaksinasi_2;
            }

            return acc;
        }, {});
        const monthNum = Object.keys(sumPerMonthVaksin1);
        const monthNumPlusOne = [];
        const monthResult = [];
        for (let j = 0; j < monthNum.length; j++) {
            monthNumPlusOne.push(parseInt(monthNum[j]) + 1);
        }
        for (let i = 0; i < monthNum.length; i++) {
            let montthhhh = new Date(`${monthNumPlusOne[i]}`);
            monthResult.push(
                montthhhh.toLocaleString("id-ID", { month: "long" })
            );
        }
        const ctx1 = document.getElementById("myChart1");
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: monthResult,
                datasets: [
                    {
                        label: "Vaksinasi Dosis I",
                        data: Object.values(sumPerMonthVaksin1),
                        backgroundColor: ["rgb(235, 52, 52)"],
                        borderColor: ["rgb(235, 52, 52)"],
                        borderWidth: 1,
                    },
                    {
                        label: "Vaksinasi Dosis II",
                        data: Object.values(sumPerMonthVaksin2),
                        backgroundColor: ["rgb(52, 70, 235)"],
                        borderColor: ["rgb(52, 70, 235)"],
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
    } catch (error) {
        console.log(error);
        return error;
    }
};

fetchTotalCovid();
fetchTotalVaksin();
