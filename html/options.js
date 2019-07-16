// window.onload = function () {
//     new Vue({
//         el: '#optionsDiv',
//         data: {
//             intervalOptions: [
//                 "10",
//                 "20",
//                 "30",
//                 "40",
//                 "50",
//                 "60"
//             ]
//             ,alarmOptions:[
//                 "5",
//                 "10",
//                 "15",
//                 "20"
//             ]

//         }
//     })
// }

$(function() {
    let storage = CybozuStorage.sharedInstance();

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
            ],
            alarmOptions: [
                "5",
                "10",
                "15",
                "20"
            ],
            interval: storage.updateInterval,
            alarm: storage.alarmTime
        }
    });

    $("#tabs").tabs();
    $("#intervalSelect").selectmenu();
    $("#alarmSelect").selectmenu();
    $("input[type=submit]").button();
    $("#saveButton").click(function(event) {
        storage.alarmTime = alarm;
        storage.updateInterval = interval;
        storage.save();
        event.preventDefault();
    });
});