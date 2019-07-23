class CybozuAPI {
    
    constructor(){
        this.client = new APIClient();
    }

    /* 
    userName: String
    password : String
    callback: Function
     */
    login(userName, password, callback) {
        let url = Constants.GAROON_PATH + Constants.Login_API;
        console.info("login url is: " + url);
        let data = {"username": userName,
                    "password": password};
        this.client.post(url, JSON.stringify(data), function(resp) {
            console.log(resp);
            if (callback != null) {
                callback();
            }
        },"json");
    }

    /* 
    start: Date
    end :Date 
     */
    notificationList(start, end, callback) {
        let url = Constants.GAROON_PATH + Constants.NOTIFICATION_LIST;
        console.log("notification list URL is " + url); 
        let data = { "start": start.toJSON()};
        if (end) {
            data["end"] = end.toJSON();
        }
        console.log("notification list data is " + JSON.stringify(data));

        this.client.post(url, JSON.stringify(data), function(resp){
            console.log(resp);
            callback(resp);
        },"json") ;
    }

    /* 
    start: Date
    end: Date
    callback : Function
     */
    scheduleEventList(start, end, callback) {
        let url = Constants.GAROON_PATH + Constants.SCHEDULE_EVENT_LIST;
        console.log("schedule event list url is " + url);
        let data = {"start": start.toJSON()};
        if (end) {
            data["end"] = end.toJSON();
        }

        let dataString = JSON.stringify(data);
        console.log("schedule event list data : " + dataString);
        $.post(url, dataString, function(resp) {
            console.log(resp);
            callback(resp);
        });
    }

    /* 
    callback: Function
     */
    scheduleFacilityList(callback) {
        let url = Constants.GAROON_PATH + Constants.SCHEDULE_FACILITY_LIST;
        $.post(url,null, function(resp) {
            callback();
        });
    }

    /* 
    callback : Function
     */
    mailReceive(callback) {
        let url = Constants.GAROON_PATH + Constants.MAIL_RECEIVE;
        $.post(url , null , function(resp) {
            callback(resp);
        });
    }
}