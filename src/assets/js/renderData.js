import { changeStatusHeart } from './changeStatusHeart';

const dps = []; // dataPoints
const chart = new CanvasJS.Chart("ChartContainer", {
    maintainAspectRatio: false,
    title :{
        text: "Heart Beat"
    },
    axisY: {
        includeZero: false
    },      
    data: [{
        type: "line",
        dataPoints: dps,
        xValueType: "dateTime"
    }]
});

let xVal = 0;
let yVal = 0; 
let dataLength = 10; // number of dataPoints visible at any point

export const updateChart = function (data) {
    const fat_gramms        =   document.getElementById("fat_gramms");
    const meters            =   document.getElementById("meters");
    const steps             =   document.getElementById("steps");
    const callories         =   document.getElementById("callories");
    const heart_rate        =   document.getElementById("heart_rate");
    const status        =   document.getElementById("status");
    const statusTime        =   document.getElementById("status-time");

    heart_rate.value    =   data.heart_rate;
    steps.value         =   data.steps;
    callories.value     =   data.callories;
    meters.value        =   data.meters;
    fat_gramms.value    =   data.fat_gramms; 
    status.value        =   data.battery_status;
    statusTime.value    =   data.battery_level; 

    changeStatusHeart();

    xVal = data.time;
    yVal = data.heart_rate;
        
    dps.push({
        x: xVal,
        y: yVal
    }); 

    if (dps.length > dataLength) {
        dps.shift();
    }

    chart.render();
};


/*
updateChart(data);
setInterval(function(){
    updateChart()
}, updateInterval);


const dataHeart = [];
    
const Chart = new CanvasJS.Chart("ChartContainer", {
    zoomEnabled: true, // Dùng thuộc tính có thể zoom vào graph
    title: {
        text: "HEART BEAT GRAPH" // Viết tiêu đề cho graph
    },
    toolTip: { // Hiển thị truường trên graph
        shared: true
    },
    axisX: {
        title: "chart updates every 2 secs" // Chú thích cho trục X
    },
    data: [{
        type: "line", // Chọn kiểu dữ liệu đường
        xValueType: "dateTime", // Cài đặt kiểu giá trị tại trục X là thuộc tính thời gian
        showInLegend: true, // Hiển thị "temp" ở mục chú thích (legend items)
        name: "heart beat",
        dataPoints: dataHeart // Dữ liệu hiển thị sẽ lấy từ data
    }],
});
let yHeartVal = 0; // Biến lưu giá trị nhip tim theo trục Y
const time = new Date(); // Lấy thời gian hiện tại

export const updateChart = function(data) {
    const updateInterval = 2000;

    const fat_gramms    =   document.getElementById("fat_gramms");
    const meters        =   document.getElementById("meters");
    const steps         =   document.getElementById("steps");
    const callories     =   document.getElementById("callories");
    const heart_rate    =   document.getElementById("heart_rate");

    heart_rate.value    =   data.heart_rate;
    steps.value         =   data.steps;
    callories.value     =   data.callories;
    meters.value        =   data.meters;
    fat_gramms.value    =   data.fat_gramms;    

    changeStatusHeart();

    time.setTime(time.getTime() + updateInterval);
    yHeartVal = data.heart_rate;
    
    dataHeart.push({ // cập nhât dữ liệu mới từ server
        x: time.getTime(),
        y: yHeartVal
    });

    Chart.render(); // chuyển đổi dữ liệu của của graph thành mô hình đồ họa
};
*/