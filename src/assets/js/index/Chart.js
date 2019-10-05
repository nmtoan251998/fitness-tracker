const labels = ['19:01 PM', '19:02 PM', '19:04 PM', '19:05 PM', '19:07 PM', '19:10 PM', '19:11 PM', '19:16 PM', '19:17 PM'];
const data = [75, 89, 69, 86, 75, 86, 89, 78, 79];
const options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: false
            }
        }]
    },
    responsive: true,
    maintainAspectRatio: true
};

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Heart rate',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.1)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: options
});