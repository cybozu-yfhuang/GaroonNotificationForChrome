window.onload = function () {
    new Vue({
        el: '#optionsDiv',
        data: {
            intervalOptions: [
                "10",
                "20",
                "30",
                "40",
                "50",
                "60"
            ]   
            ,alarmOptions:[
                "5",
                "10",
                "15",
                "20"
            ]

        }
    })
}