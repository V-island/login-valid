/**
 * 验证输入内容
 * @returns boolean result
 * @returns string errorMsg
 */
class Rules
{
    public result: boolean = true;
    public errorMsg: string = "";

    constructor(value: any)
    {
        this.validateField(value);
    }
    
    private validateField(field: any)
    {
        let el = $(field);

        //验证非空表单
        let required = el.attr("required");
        if(required && required == "required")
        {
            let value = el.val();

            if(value == "")
            {
                this.errorMsg = "该项不能为空";
                return this.result = false;
            }
        }

        //验证表单数据类型
        let checkType = el.attr("check-type");

        if(checkType)
        {
            let Type = checkType;
            let value = el.val();

            switch (Type)
            {
                case "email":
                    if(this.checkEmail(value))
                    {
                        this.errorMsg = "邮箱输入错误";
                        return this.result = false;
                    }
                    this.result = true;
                    break;
                case "mobile":
                    if(this.checkMobile(value))
                    {
                        this.errorMsg = "手机号输入错误";
                        return this.result = false;
                    }
                    this.result = true;
                    break;
            }
        }
    }

    //验证是否为整数
    private checkInt(value: any)
    {
        return (!/^[0-9]\d*$/.test(value));
    }

    //验证是否为数字
    private checkNumber(value: any)
    {
        return (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));
    }

    //验证邮箱
    private checkEmail(value: any)
    {
        return (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value));
    }

    //验证手机号
    private checkMobile(value: any)
    {
        return (!/^0?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value));
    }
}

let form = $("#login-main-form");
let navTabs = $(".nav_tabs .navtab-link");

//验证input输入框值
form.find("input").each(function(){
    $(this).blur(function(){
        valiElment($(this));
    })
})

//表单提交验证所有值
$(".login-button", form).click(function()
{
    let flag: boolean = true;

    form.find("input").each(function(){
        flag = flag && valiElment($(this));
    })
    
    if(flag)
    {
        form.submit();
    }
})

//Tabs
navTabs.click(function()
{
    let _this = $(this); 
    let tabsContent = $(".tabs_content");
    let i = "now";

    if(!_this.hasClass(i)){
        let t = _this.data('tab');

        navTabs.removeClass(i);
        tabsContent.removeClass(i);
        _this.addClass(i);
        switch (t)
        {
            case "pwd":
                $(".tabs_content[data-con='pwd']").addClass(i)
                break;
            case "qr":
                $(".tabs_content[data-con='qr']").addClass(i)
                break;
        }
    }
})

let valiElment = function(el: any)
{
    let result = new Rules(el);
    let groupBox = el.parents('.form-group');

    if(result.result)
    {
        groupBox.removeClass('error');
        groupBox.find(".help-block").remove();
    } else
    { 
        groupBox.find(".help-block").remove();
        groupBox.addClass('error');
        groupBox.append('<span class="help-block">' + result.errorMsg +'</span>');
    }
    return result.result;
}