var tabs = {
    navTabs: $(".nav_tabs .navtab-link"),
    tabsContent: $(".tabs_content"),
    event: function() {
        var i = "now";
        tabs.navTabs.on("click", function(e) {
            let _this = $(this); 
            if(!_this.hasClass(i)){
                let t = _this.data('tab');
                tabs.navTabs.removeClass(i);
                tabs.tabsContent.removeClass(i);
                _this.addClass(i);
                switch (t) {
					case "pwd":
                        $(".tabs_content[data-con='pwd']").addClass(i)
						break;
					case "qr":
                        $(".tabs_content[data-con='qr']").addClass(i)
						break;
				}
            }
		})
    },
    init: function() {
		this.event()
	}
};
tabs.init();