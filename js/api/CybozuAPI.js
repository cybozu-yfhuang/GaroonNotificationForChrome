class CybozuAPI {
    
    constructor(){
        this.client = new APIClient();
    }

    /* 
    userName: String
    password : String
    callback: Function
     */
    login(userName, password, callback,errorCallback) {
        bugout.log("background -- API - start login");

        let url = this.combineURL(Constants.Login_API);
        bugout.log("background -- login url is: " + url);

        let data = {"username": userName,
                    "password": password};
        this.client.post(url, JSON.stringify(data), function(resp) {
            bugout.log("background -- login Success");
            if (callback != null) {
                callback();
            }
        },function(error) {
            bugout.log("background -- login Error");
            if (errorCallback != null) {
                errorCallback();
            }
        });
    }

    /* 
    start: Date
    end :Date 
     */
    notificationList(start, end, callback) {
        bugout.log("background -- API - start notificationList ===================");
        let url = this.combineURL(Constants.NOTIFICATION_LIST);
        bugout.log("background -- notification list URL is " + url); 
        let data = { "start": start.toJSON()};
        if (end) {
            data["end"] = end.toJSON();
        }
        bugout.log("background -- notificationList POST data - " + JSON.stringify(data));

        this.client.post(url, JSON.stringify(data), function(resp){
            bugout.log("background -- notificationList Success");
            callback(resp);
        },"json") ;
    }

    /* 
    start: Date
    end: Date
    callback : Function
     */
    scheduleEventList(start, end, callback) {
        let url = this.combineURL(Constants.SCHEDULE_EVENT_LIST);
        bugout.log("schedule event list url is " + url);
        let data = {"start": start.toJSON()};
        if (end) {
            data["end"] = end.toJSON();
        }

        let dataString = JSON.stringify(data);
        bugout.log("schedule event list data : " + dataString);
        $.post(url, dataString, function(resp) {
            bugout.log(resp);
            callback(resp);
        });
    }

    /* 
    callback: Function
     */
    scheduleFacilityList(callback) {
        let url = this.combineURL(Constants.SCHEDULE_FACILITY_LIST);
        $.post(url,null, function(resp) {
            callback();
        });
    }

    /* 
    callback : Function
     */
    mailReceive(callback) {
        let url = this.combineURL(Constants.MAIL_RECEIVE);
        $.post(url , null , function(resp) {
            callback(resp);
        });
    }

    combineURL(apiPath) {
        let path = CybozuStorage.sharedInstance().url;
        if (!path.endsWith("/")) {
            path = path + "/";
        }
        return path + Constants.API_SUFFIX + apiPath;
    }
}