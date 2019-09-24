let bugout = new debugout();
$(function() {
    bugout.log("options -- start")

    let storage = CybozuStorage.sharedInstance();

    new Vue({
        el: '#optionsDiv',
        data: {
            intervalOptions: [
                "0.1",
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

    new Vue({ 
        el: "#loginDiv",
        data: {
            url: storage.url,
            loginName: storage.userName,
            password: storage.password
        }
    });

    $("#tabs").tabs();

    $("#loginButton").click(function(event) {

        let url = $("#URLInput").val();
        let userName = $("#loginNameInput").val();
        let password = $("#loginPasswordInput").val();
        bugout.log("options -- loginButton clicked -- " + url + " + " + userName);

        storage.url = url;
        storage.userName = userName;
        storage.password = password;

        let api = new CybozuAPI();
        api.login(userName, password,function(params) {
            storage.save();
            alert("Login Success");
        }, function() {
            alert("Login Error");
        });

        event.preventDefault();
    });

    $("#intervalSelect").selectmenu();
    $("#alarmSelect").selectmenu();
    $("input[type=submit]").button();
    $("input[type=button]").button();

    $("#saveButton").click(function(event) {


        storage.alarmTime = $("#alarmSelect").val();
        storage.updateInterval = $("#intervalSelect").val();
        bugout.log("options -- saveButton clicked -- " + $("#alarmSelect").val());

        storage.save();
        event.preventDefault();
    });

    $("#downloadLogButton").click(function(event) {
        let bugout = new debugout();
        bugout.log("options -- downloadLogButton clicked");        
        bugout.downloadLog();
        event.preventDefault();
    });
});