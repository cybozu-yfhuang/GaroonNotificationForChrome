class CybozuAPI {
    
    constructor(){}

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
        $.post(url, JSON.stringify(data), function(resp) {
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

        $.post(url, JSON.stringify(data), function(resp){
            console.log(resp);
            if (resp.success) {
                for(let element of resp.schedule) {
                    let notificationID = "scheudle" + element.id;
                    CybozuNotifier.notify(notificationID, element.title, element.body, function(nid) {
                        if(nid == notificationID) {
                            chrome.tabs.create({url: element.url});           
                        }
                    });
                }
            }
        },"json") ;
    }

    /* 
    start: Date
    end: Date
    callback : Function
     */
    scheduleEventList(start, end, callback) {
        let url = Constants.GAROON_PATH + Constants.SCHEDULE_EVENT_LIST;
        Console.log("schedule event list url is " + url);
        let data = {"start": start.toJSON()};
        if (end) {
            data["end"] = end.toJSON();
        }

        let dataString = JSON.stringify(data);
        console.log("schedule event list data : " + dataString);
        $.post(url, dataString, function(resp) {
            callback();
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
            callback();
        });
    }
}