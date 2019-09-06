declare var jquery:any
///<reference path="../../typings/index.d.ts" />
function go(x:number) :void{
    switch (x) {
        case 1:
            window.location.href="../index.html";
            break;
        case 2:
            window.location.href="";
            break;
        case 3:
            window.location.href="";
            break;
        case 4:
            window.location.href="";
            break;
        case 5:
            window.location.href="view/mine.html";
            break;
    }
}
function login():void {
    window.location.href="login.html";
}
function register():void {
    window.location.href="register.html";
}
function back():void {
    history.back();
}
function select(index:number,obj:any):void {
    switch (index) {
        case 1:
            $(obj).addClass('active').siblings().removeClass('active');
            break;
        case 2:
            $(obj).addClass('active').siblings().removeClass('active');
            break;
        case 3:
            $(obj).addClass('active').siblings().removeClass('active');
            break;
        case 4:
            $(obj).addClass('active').siblings().removeClass('active');
            break;
    }
}
/*
测试*/

