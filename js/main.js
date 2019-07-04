

var api = new CybozuAPI();
var start = new Date(Date.now().valueOf() - 30 * 24 * 60 * 60 * 1000);
var end = new Date(Date.now().valueOf());

let timer = new CybozuTimer();

api.login(Constants.USERNAME, Constants.PASSWORD, function(){

    timer.startTimer(function () {
        api.notificationList(start, end);
        start = new Date(Date.now().valueOf() - Constants.Refresh_Interval);
        end = new Date(Date.now().valueOf());


    }, Constants.Refresh_Interval);


});


