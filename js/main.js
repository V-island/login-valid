"use strict";
var Rules = /** @class */ (function () {
    function Rules(value) {
        this.result = true;
        this.errorMsg = "";
        this.validateField(value);
    }
    Rules.prototype.validateField = function (field) {
        var el = $(field);
        //验证非空表单
        var required = el.attr("required");
        if (required && required == "required") {
            var value = el.val();
            if (value == "") {
                this.errorMsg = "该项不能为空";
                return this.result = false;
            }
        }
        //验证表单数据类型
        var checkType = el.attr("check-type");
        if (checkType) {
            var Type = checkType;
            var value = el.val();
            switch (Type) {
                case "email":
                    if (this.checkEmail(value)) {
                        this.errorMsg = "邮箱输入错误";
                        return this.result = false;
                    }
                    this.result = true;
                    break;
                case "mobile":
                    if (this.checkMobile(value)) {
                        this.errorMsg = "手机号输入错误";
                        return this.result = false;
                    }
                    this.result = true;
                    break;
            }
        }
    };
    //验证是否为整数
    Rules.prototype.checkInt = function (value) {
        return (!/^[0-9]\d*$/.test(value));
    };
    //验证是否为数字
    Rules.prototype.checkNumber = function (value) {
        return (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));
    };
    //验证邮箱
    Rules.prototype.checkEmail = function (value) {
        return (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value));
    };
    //验证手机号
    Rules.prototype.checkMobile = function (value) {
        return (!/^0?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value));
    };
    return Rules;
}());
var form = $("#login-main-form");
var navTabs = $(".nav_tabs .navtab-link");
//验证input输入框值
form.find("input").each(function () {
    $(this).blur(function () {
        valiElment($(this));
    });
});
//表单提交验证所有值
$(".login-button", form).click(function () {
    var flag = true;
    form.find("input").each(function () {
        flag = flag && valiElment($(this));
    });
    if (flag) {
        form.submit();
    }
});
//Tabs
navTabs.click(function () {
    var _this = $(this);
    var tabsContent = $(".tabs_content");
    var i = "now";
    if (!_this.hasClass(i)) {
        var t = _this.data('tab');
        navTabs.removeClass(i);
        tabsContent.removeClass(i);
        _this.addClass(i);
        switch (t) {
            case "pwd":
                $(".tabs_content[data-con='pwd']").addClass(i);
                break;
            case "qr":
                $(".tabs_content[data-con='qr']").addClass(i);
                break;
        }
    }
});
var valiElment = function (el) {
    var result = new Rules(el);
    var groupBox = el.parents('.form-group');
    if (result.result) {
        groupBox.removeClass('error');
        groupBox.find(".help-block").remove();
    }
    else {
        groupBox.find(".help-block").remove();
        groupBox.addClass('error');
        groupBox.append('<span class="help-block">' + result.errorMsg + '</span>');
    }
    return result.result;
};
