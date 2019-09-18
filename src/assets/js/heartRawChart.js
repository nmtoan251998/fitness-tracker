import { changeStatusHeart } from './changeStatusHeart';

window.onload = function() {
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
    const updateInterval = 2000; // Thời gian cập nhật dữ liệu 2000ms = 2s
    const time = new Date(); // Lấy thời gian hiện tại

    const updateChart = function() {
                   
        // Gán giá trị từ localhost:8000/get vào textbox để hiển thị bước đi, calo
        const fat_gramms    =   document.getElementById("fat_gramms");
        const meters        =   document.getElementById("meters");
        const steps         =   document.getElementById("steps");
        const callories     =   document.getElementById("callories");
        const heart_rate    =   document.getElementById("heart_rate");

        //recieve data from server
        heart_rate.value    =   result[0].heart_rate;
        steps.value         =   result[0].steps;
        callories.value     =   result[0].callories;
        meters.value        =   result[0].meters;
        fat_gramms.value    =   result[0].fat_gramms;

        changeStatusHeart();
            // Xuất ra màn hình console trên browser giá trị nhận được từ localhost:8000/get
        time.setTime(time.getTime() + updateInterval);
        yHeartVal = parseInt(Math.round((0+200)*150)/100);
        dataHeart.push({ // cập nhât dữ liệu mới từ server
            x: time.getTime(),
            y: yHeartVal
        });

        Chart.render(); // chuyển đổi dữ liệu của của graph thành mô hình đồ họa
    };

    updateChart(); // Chạy lần đầu tiên
    setInterval(function() { // Cập nhật lại giá trị graph sau thời gian updateInterval
        updateChart()
    }, updateInterval);
            
    }