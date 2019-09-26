let bugout = new debugout();
$(function() {
    bugout.log("options -- start")

    let storage = CybozuStorage.sharedInstance();

    // new Vue({
    //     el: '#optionsDiv',
    //     data: {
    //         intervalOptions: [
    //             "0.1",
    //             "10",
    //             "20",
    //             "30",
    //             "40",
    //             "50",
    //             "60"
    //         ],
    //         alarmOptions: [
    //             "5",
    //             "10",
    //             "15",
    //             "20"
    //         ],
    //         interval: storage.updateInterval,
    //         alarm: storage.alarmTime
    //     }
    // });

    new Vue({ 
        el: "#loginDiv",
        data: {
            url: storage.url,
            loginName: storage.userName,
            password: storage.password
        }
    });

    $("#intervalSelect option").map(function(index, elm){
        if ( $(elm).val() == storage.updateInterval) {
            elm.selected = true;
        }
    });
    // $("#tabs").tabs();
    var isloging = false;

    function showLoading(){
        isloging = true;
        $('#loginButton').hide();
        $('#loaddingDiv').show();
    }

    function hideLoading(){
        isloging = false;
        $('#loginButton').show();
        $('#loaddingDiv').hide();
    }

    $("#loginButton").click(function(event) {
        if (isloging) {
            return;
        }
        
        showLoading();

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

            hideLoading();

            alert("Login Success");
        }, function() {
            hideLoading();

            alert("Login Error");
        });

        event.preventDefault();
    });



    // $("#intervalSelect").selectmenu();
    // $("#alarmSelect").selectmenu();
    // $("input[type=submit]").button();
    // $("input[type=button]").button();

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

$(document).ready(function() { 

	(function ($) { 
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
        
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
			
            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').hide();
            if (index == 0)
            {
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show("slide", { direction: "left" }, 200);
            }
            else {
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').show("slide", { direction: "right" },200);
            }

			g.preventDefault();
		} );
	})(jQuery);

});