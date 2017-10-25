/**
 * Created by Administrator on 2017-10-25.0025.
 */
(function () {
    //1.把数据set到本地
    //2.把数据get回来
    //创建一个新的空数组task_list
    var task_list=[];

//定义$addTask是表单的
    $addTask=$(".add-task");

    init();
    $addTask.on("submit",function (ev) {
        ev.preventDefault();//阻止默认时间，页面刷新
        var obj={};//定义一个空的对象
        obj.content=$addTask.find("input").val();//obj对象中的content是输入的内容
        if (!obj.content)return;//如果输入的内容为空，终止下一步
        add_task(obj);//执行函数add_task传入参数obj
        $addTask.find("input").val(null);//每次输入完后，清空输入框的内容
        refresh_add_list();//生成li
    });
    //初始化
    function init() {
        task_list = store.get("task") || [];//
        refresh_add_list();//生成li
    }
    //添加任务
    function add_task(obj) {
        task_list.push(obj);//把内容推到数组中去
        store.set("task",task_list);//把数据存进去
    }
    //把li循环出来
    function refresh_add_list() {
        var $task_list_warp=$(".task-list");//定义$task_list_warp为ul
        $task_list_warp.html(null);//每次执行前删除以前的内容
        for(var i=0;i<task_list.length;i++){
            var item = task_listHtml(task_list[i],i);
            $task_list_warp.prepend(item);
        }
        delete_task_list();//删除li
    }
    //绑定任务列表的html
    function task_listHtml(data,i) {
        if (!data) return;
        var str ='<li data-index="'+i+'" class="task-item">'+//在li中设置一个data-index的参数，用于按钮点击时获取到该按钮的对应li
            '<input type="checkbox" class="complete">'+
            '<span class="task-content">'+data.content+'</span>'+
            '<div class="fr">'+
            '<span class="action delete">删除</span>'+
            '<span class="action detail">详细</span>'+
            '</div>'+
            '</li>';
        return str;
    }
    //删除功能
    function delete_task_list() {
        var $delete_btn=$(".action.delete");//定义$delete_btn为删除按钮
        $delete_btn.on("click",function () {
            var index = $(this).parent().parent().data("index");//定义index是点击按钮父级的父级的index
           // delete task_list[index];//删除掉task_list中第index位对象
            task_list.splice(index,1);
            var off = confirm("确定删除吗？");
            if(!off) return;
            store.set("task",task_list);//存到数据库
            refresh_add_list();//重新渲染
        })
    }
}());


