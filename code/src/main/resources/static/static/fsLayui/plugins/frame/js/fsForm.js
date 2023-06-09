/**
 * @Description: form表单工具
 * @Copyright: 2017 wueasy.com Inc. All rights reserved.
 * @author: fallsea
 * @version 1.8.0
 * @License：MIT
 */
layui.define(['layer', "fsCommon", "form", 'laydate', "fsConfig", 'layedit'], function (exports) {
    var layer = layui.layer,
        fsCommon = layui.fsCommon,
        laydate = layui.laydate,
        fsConfig = layui.fsConfig,
        layedit = layui.layedit,
        form = layui.form,
        statusName = $.result(fsConfig, "global.result.statusName", "errorNo"),
        msgName = $.result(fsConfig, "global.result.msgName", "errorInfo"),
        dataName = $.result(fsConfig, "global.result.dataName", "results.data"),
        successNo = $.result(fsConfig, "global.result.successNo", "0"),
        loadDataType = $.result(fsConfig, "global.loadDataType", "0");
    selectVals = {},//下拉框默认值
        FsForm = function () {
            this.config = {
                id: "",//form表单id
                elem: null//form对象
            }
        };

    var layEdits = {};

    FsForm.prototype.render = function (options) {
        var thisForm = this;
        $.extend(true, thisForm.config, options);

        if ($.isEmpty(thisForm.config.id) && $.isEmpty(thisForm.config.elem)) {
            fsCommon.warnMsg("form选择器不能为空!");
            return;
        }

        if (!$.isEmpty(thisForm.config.id)) {
            thisForm.config.elem = $("#" + thisForm.config.id);
        }

        thisForm.loadFormData();

        thisForm.renderDate();

        thisForm.renderEditor();

        thisForm.renderEditor2();

        thisForm.renderLayedit();

        thisForm.bindButtonSubmit();

        return thisForm;
    };

    //渲染富文本编辑器
    FsForm.prototype.renderEditor = function () {

        var thisForm = this;
        $(thisForm.config.elem).find(".fsEditor").each(function () {

            var _height = $(this).attr("height");
            if ($.isEmpty(_height)) {
                _height = 100;
            }

            tinymce.init({
                selector: "#" + $(this).attr("id"),
                height: _height,
                language: 'zh_CN',
                plugins: [
                    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                    "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
                ],

                toolbar1: "bold italic underline forecolor backcolor strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                toolbar2: "undo redo | searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image media code | insertdatetime preview",
                toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",

                menubar: false,
                toolbar_items_size: 'small',
//			  	  images_upload_url: '/upload',
                images_upload_handler: function (blobInfo, success, failure) {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open('POST', $.result(fsConfig, "global.uploadUrl"));
                    xhr.onload = function () {

                        if (xhr.status != 200) {
                            failure('HTTP Error: ' + xhr.status);
                            return;
                        }
                        var result = JSON.parse(xhr.responseText);

                        if (result[statusName] != successNo) {
                            failure(result[msgName]);
                            return;
                        }
                        success($.result(result, $.result(fsConfig, "global.result.file.path")));
                    };
                    formData = new FormData();
                    formData.append('file', blobInfo.blob(), blobInfo.filename());
                    xhr.send(formData);
                },

                style_formats: [{
                    title: 'Bold text',
                    inline: 'b'
                }, {
                    title: 'Red text',
                    inline: 'span',
                    styles: {
                        color: '#ff0000'
                    }
                }, {
                    title: 'Red header',
                    block: 'h1',
                    styles: {
                        color: '#ff0000'
                    }
                }, {
                    title: 'Example 1',
                    inline: 'span',
                    classes: 'example1'
                }, {
                    title: 'Example 2',
                    inline: 'span',
                    classes: 'example2'
                }, {
                    title: 'Table styles'
                }, {
                    title: 'Table row 1',
                    selector: 'tr',
                    classes: 'tablerow1'
                }],

                templates: [{
                    title: 'Test template 1',
                    content: 'Test 1'
                }, {
                    title: 'Test template 2',
                    content: 'Test 2'
                }],

                init_instance_callback: function () {
                    window.setTimeout(function () {
                        $("#div").show();
                    }, 1000);
                }
            });
        });

    };

    //渲染富文本编辑器
    FsForm.prototype.renderEditor2 = function () {

        var thisForm = this;
        $(thisForm.config.elem).find("#editor").each(function () {
            UE.getEditor('editor');
            //UE.getEditor('editor').setContent('欢迎使用ueditor');
        });

    };

    //渲染日期控件绑定
    FsForm.prototype.renderDate = function () {
        var thisForm = this;
        $(thisForm.config.elem).find("input.fsDate").each(function () {
            var options = {};
            var _this = $(this);
            var dateRange = _this.attr("dateRange");//区间选择，1 是
            var dateType = _this.attr("dateType");//控件选择类型
            var dateFormat = _this.attr("dateFormat");//自定义格式
            var dateMin = _this.attr("dateMin");//最大值
            var dateMax = _this.attr("dateMax");//最小值

            options["elem"] = this; //指定元素;
            if (dateRange == "1") {
                options["range"] = true;
            }
            if (!$.isEmpty(dateType)) {
                options["type"] = dateType;
            }
            if (!$.isEmpty(dateFormat)) {
                options["format"] = dateFormat;
            }
            var value = _this.val();//默认值
            if (!$.isEmpty(value)) {
                options["value"] = value;
            }
            if (!$.isEmpty(dateMin)) {
                options["min"] = dateMin;
            }
            if (!$.isEmpty(dateMax)) {
                options["max"] = dateMax;
            }

            laydate.render(options);
        });
    };

    /**
     * 渲染lay编辑器
     */
    FsForm.prototype.renderLayedit = function () {
        var thisForm = this;
        //lay编辑器设置
        layedit.set({
            uploadImage: {
                url: $.result(fsConfig, "global.uploadUrl") //接口url
                , type: 'post' //默认post
            }
        });
        $(thisForm.config.elem).find("textarea.fsLayedit").each(function () {
            var _this = $(this);
            var id = _this.attr("id");
            var name = _this.attr("name");
            var _height = _this.attr("height");
            if (!$.isEmpty(id) && !$.isEmpty(name)) {
                layEdits[name] = layedit.build(id, {
                    height: _height
                }); //建立编辑器

            }
        });
    };

    /**
     * 渲染全部数据字典配置
     */
    FsForm.prototype.renderDictAll = function (b) {
        var thisForm = this;
        //获取加载数据字典信息
        $(thisForm.config.elem).find(".fsDict,.fsSelect").each(function () {
            var _this = $(this);
            if (!b) {
                if (_this.is('input')) {//单选或者多选
                    var type = _this.attr("type").toLowerCase();
                    var dict = _this.attr("dict");
                    if (!$.isEmpty(dict) && (type == "checkbox" || type == "radio")) {
                        thisForm.loadDictData(_this, false, null, type);
                    }

                }
            } else {
                if (_this.is('input')) {//单选或者多选
                    var type = _this.attr("type").toLowerCase();
                    var dict = _this.attr("dict");
                    if (!$.isEmpty(dict) && (type == "checkbox" || type == "radio")) {
                        thisForm.loadDictData(_this, false, null, type);
                    }

                } else if (_this.is('select')) {
                    thisForm.renderSelect(_this);
                }
            }

        });

    }

    /**
     * 渲染全部下拉框
     */
    FsForm.prototype.renderSelectAll = function () {
        var thisForm = this;

        $(thisForm.config.elem).find("select.fsSelect").each(function () {
            var _this = $(this);
            thisForm.renderSelect(_this);
        });
    };

    /**
     * 渲染下拉框
     */
    FsForm.prototype.renderSelect = function (_this, b, value) {
        var thisForm = this;
        thisForm.loadDictData(_this, b, value, "select");
        //绑定选择器
        var childrenSelectId = _this.attr("childrenSelectId");
        var lay_filter = _this.attr("lay-filter");
        if (!$.isEmpty(childrenSelectId) && !$.isEmpty(lay_filter)) {
            form.on('select(' + lay_filter + ')', function (data) {
                //如果选择项为空，清空所有的子选择项
                thisForm.cleanSelectData(_this);
                if (!$.isEmpty(data.value)) {
                    thisForm.renderSelect($("#" + childrenSelectId), true, data.value);
                }
            });

        }

        form.render("select"); //更新全部
    };

    /**
     * 清空下拉框
     */
    FsForm.prototype.cleanSelectData = function (_this) {
        var childrenSelectId = _this.attr("childrenSelectId");
        if ($.isEmpty(childrenSelectId)) {
            return;
        }
        var _childerThis = $("#" + childrenSelectId);
        if (_childerThis.length == 0) {
            return;
        }
        var addNull = _childerThis.attr("addNull");//是否显示空值，1 显示
        _childerThis.empty();//清空
        if (addNull == "1") {
            _childerThis.append("<option></option>");
        }
        form.render("select"); //更新全部

        this.cleanSelectData(_childerThis);//递推处理子选择器
    };

    /**
     * 加载数据
     */
    FsForm.prototype.loadDictData = function (_this, b, value, type) {
        var thisForm = this;

        var addNull = _this.attr("addNull");//是否显示空值，1 显示
        var isLoad = _this.attr("isLoad");//是否自动加载，1 是
        if (type == "select") {
            _this.empty();//清空
            if (addNull == "1") {
                _this.append("<option></option>");
            }
        }
        var dict = _this.attr("dict");
        if ($.isEmpty(dict)) {
            return false;
        }

        var dictObj = layui.fsDict[dict];

        if ($.isEmpty(dictObj)) {
            return false;
        }

        var labelField = dictObj["labelField"];
        var valueField = dictObj["valueField"];
        var method = dictObj["method"];
        var formatType = dictObj["formatType"];//格式化类型
        if (formatType == "server") {
            var funcNo = dictObj["loadFuncNo"];
            var url = dictObj["loadUrl"];//请求url
            var inputs = dictObj["inputs"];
            var param = {};//参数
            if (!$.isEmpty(inputs)) {
                var inputArr = inputs.split(',');
                $.each(inputArr, function (i, v) {
                    var paramArr = v.split(':', 2);
                    if (!$.isEmpty(paramArr[0])) {
                        //获取参数值，如果值为空，获取选中行数据
                        var _vaule = paramArr[1];
                        if ($.isEmpty(_vaule)) {
                            _vaule = value;
                        } else if ($.startsWith(_vaule, "#")) {
                            _vaule = $(_vaule).val();
                        }
                        param[paramArr[0]] = _vaule;
                    }
                });

            }
            if ($.isEmpty(url)) {
                url = "/fsbus/" + funcNo;
            }

            if (!$.isEmpty(url) && (isLoad != "0" || b)) {
                fsCommon.invoke(url, param, function (data) {
                    if (data[statusName] == successNo) {
                        var list = $.result(data, dataName);
                        thisForm.dictDataRender(_this, labelField, valueField, list, type);
                    } else {
                        //提示错误消息
                        fsCommon.errorMsg(data[msgName]);
                    }
                }, false, method);
            }
        } else {

            var list = dictObj["data"];
            thisForm.dictDataRender(_this, labelField, valueField, list, type);
        }

    };


    FsForm.prototype.dictDataRender = function (_this, labelField, valueField, list, type) {
        var thisForm = this;
        if (type == "select") {
            thisForm.selectDataRender(_this, labelField, valueField, list);
        } else if (type == "checkbox") {
            thisForm.checkboxDataRender(_this, labelField, valueField, list);
        } else if (type == "radio") {
            thisForm.radioDataRender(_this, labelField, valueField, list);
        }
    }

    /**
     * 复选框数据渲染
     */
    FsForm.prototype.checkboxDataRender = function (_this, labelField, valueField, list) {
        var thisForm = this;
        var name = _this.attr("name");
        var laySkin = _this.attr("lay-skin");
        $(list).each(function (i, v) {
            var checkbox = "<input type=\"checkbox\" name=\"" + name + "\" lay-skin=\"" + laySkin + "\" title=\"" + v[labelField] + "\" value=\"" + v[valueField] + "\">";
            _this.parent().append(checkbox);
        });
        _this.next().remove();
        _this.remove();
        form.render("checkbox"); //更新全部
    }

    /**
     *  单选框数据渲染
     */
    FsForm.prototype.radioDataRender = function (_this, labelField, valueField, list) {
        var thisForm = this;
        var name = _this.attr("name");
        $(list).each(function (i, v) {
            var checkbox = "<input type=\"radio\" name=\"" + name + "\" title=\"" + v[labelField] + "\" value=\"" + v[valueField] + "\">";
            _this.parent().append(checkbox);
        });
        _this.next().remove();
        _this.remove();
        form.render("checkbox"); //更新全部
    }

    /**
     * select数据渲染
     */
    FsForm.prototype.selectDataRender = function (_this, labelField, valueField, list) {
        var thisForm = this;

        $(list).each(function (i, v) {
            var option = "<option value=\"" + v[valueField] + "\">" + v[labelField] + "</option>";
            _this.append(option);
        });

        //默认值
        var defaultValue = selectVals[_this.attr("name")];
        if (!$.isEmpty(defaultValue)) {
            _this.val(defaultValue);
            //如果有子联动，继续渲染
            var childrenSelectId = _this.attr("childrenSelectId");
            if (!$.isEmpty(childrenSelectId)) {
                thisForm.renderSelect($("#" + childrenSelectId), true, defaultValue);
            }

        }
        form.render("select"); //更新全部
    };

    /**
     * 自动填充form表单数据
     */
    FsForm.prototype.loadFormData = function () {
        var thisForm = this;
        //参数处理，如果有参数，自动填充form表单
        var urlParam = fsCommon.getUrlParam();

        var formDom = $(thisForm.config.elem);

        //判断模式
        var _mode = urlParam["_mode"];
        if (!$.isEmpty(_mode)) {
            delete urlParam["_mode"];
            formDom.append("<input type=\"hidden\" name=\"_mode\" value=\"" + _mode + "\"/>");

            if ("readonly" == _mode) {//只读
                formDom.attr("isLoad", "1");
                //隐藏所有的非关闭按钮
                formDom.find("button").each(function (i, e) {
                    var _function = $(e).attr("function");
                    if ("close" != _function) {
                        $(e).hide();
                    } else {
                        $(e).show();
                    }
                });
                //设置只读
                formDom.find("input").addClass("layui-disabled").attr("disabled", "disabled");
                formDom.find("select,textarea").attr("disabled", "disabled");
            } else if ("add" == _mode) {//新增
                formDom.attr("isLoad", "0");
                formDom.find("button.fsEdit").hide();
                formDom.find("button:not(.fsEdit)").show();
                //只读处理
                formDom.find("input.fsAddReadonly").addClass("layui-disabled").attr("disabled", "disabled");
                formDom.find("select.fsAddReadonly,textarea.fsAddReadonly").attr("disabled", "disabled");
            } else if ("edit" == _mode) {//编辑
                formDom.attr("isLoad", "1");
                formDom.find("button.fsAdd").hide();
                formDom.find("button:not(.fsAdd)").show();
                //只读处理
                formDom.find("input.fsEditReadonly").addClass("layui-disabled").attr("disabled", "disabled");
                formDom.find("select.fsEditReadonly,textarea.fsEditReadonly").attr("disabled", "disabled");
            }

        }

        if (!$.isEmpty(urlParam)) {
            $(thisForm.config.elem).setFormData(urlParam);
        }

        //如果isLoad =1 并且功能号不为空，查询
        var _fsUuid = urlParam["_fsUuid"];
        if (!$.isEmpty(_fsUuid)) {
            delete urlParam["_fsUuid"];
        }
        if (formDom.attr("isLoad") == "1") {
            //加载单选框和复选框
            thisForm.renderDictAll(false);

            //从缓存中获取
            if (loadDataType == "1" && $.isEmpty(formDom.attr("loadFuncNo")) && $.isEmpty(formDom.attr("loadUrl"))) {
                if (!$.isEmpty(_fsUuid)) {
                    var formDataStr = $.getSessionStorage(_fsUuid);
                    if (!$.isEmpty(formDataStr)) {
                        showData(JSON.parse(formDataStr));
                    }
                }/*else{
					fsCommon.errorMsg("唯一标识获取失败!");
				}*/

            } else if (!$.isEmpty(formDom.attr("loadFuncNo")) || !$.isEmpty(formDom.attr("loadUrl"))) {
                var _method = formDom.attr("method");
                //如果配置异步地址，默认加载异步地址
                var funcNo = formDom.attr("loadFuncNo");
                var url = formDom.attr("loadUrl");//请求url
                if ($.isEmpty(url)) {
                    url = "/fsbus/" + funcNo;
                }
                fsCommon.invoke(url, urlParam, function (data) {
                    if (data[statusName] == successNo) {
                        var formData = $.result(data, dataName);
                        showData(formData);
                    } else {
                        //提示错误消息
                        fsCommon.errorMsg(data[msgName]);
                    }
                }, false, _method);

            }

        } else {
            thisForm.renderDictAll(true);
        }

        if (!$.isEmpty(_fsUuid)) {
            //删除
            $.removeSessionStorage(_fsUuid);

        }

        //显示数据
        function showData(formData) {
            if ($.isEmpty(formData)) {
                fsCommon.errorMsg("记录不存在!");
                return;
            }
            formDom.setFormData(formData);
            form.render(); //更新全部

            //联动下拉框处理，
            //1.先把联动下拉框数据缓存
            //2.异步加载完后，赋值
            $(thisForm.config.elem).find("select.fsSelect").each(function () {
                var _name = $(this).attr("name");
                selectVals[_name] = formData[_name];
            });

            $(thisForm.config.elem).find("select.fsSelect").each(function () {
                var selectDom = $(this);
                if (selectDom.attr("isLoad") != "0") {//一级下拉
                    thisForm.renderSelect(selectDom);
                }
            });
        }

    };


    /**
     * 绑定提交按钮
     */
    FsForm.prototype.bindButtonSubmit = function () {
        var thisForm = this;
        $(thisForm.config.elem).find("button").each(function () {
            var lay_filter = $(this).attr("lay-filter");
            /**监听新增提交*/
            form.on("submit(" + lay_filter + ")", function (data) {

                var _thisButton = $(this);
                thisForm.submitForm(data.field, _thisButton, thisForm.config.elem);
                return false;
            });
        });
    }

    /**
     * form表单格式验证
     */
    if (!$.isEmpty(fsConfig["verify"])) {
        form.verify(fsConfig["verify"]);
    }

    /**
     * 提交请求
     */
    FsForm.prototype.submitForm = function (param, _this, formElem) {
        var thisForm = this;
        var url = _this.attr("url");//请求url
        var funcNo = _this.attr("funcNo");
        if ($.isEmpty(funcNo) && $.isEmpty(url)) {
            fsCommon.warnMsg('功能号或请求地址为空!');
            return;
        }
        if ($.isEmpty(url)) {
            url = "/fsbus/" + funcNo;
        }

        //处理layedit编辑器内容
        $.each(layEdits, function (key, val) {
            param[key] = layedit.getContent(val);
        });

        //处理的tinymce编辑器值
        $(thisForm.config.elem).find(".fsEditor").each(function (i, v) {
            param[$(this).attr("name")] = tinymce.editors[i].getBody().innerHTML;
        });

        //处理的CKEDITOR编辑器值
        $(thisForm.config.elem).find(".mytext").each(function (i, v) {
            param[$(this).attr("name")] = CKEDITOR.instances.content.getData();
        });

        fsCommon.invoke(url, param, function (data) {
            if (data[statusName] == successNo) {
                fsCommon.successMsg('操作成功!');
                fsCommon.setRefreshTable("1");

                //是否自动关闭，默认是
                if (_this.attr("isClose") != "0") {
                    parent.layer.close(parent.layer.getFrameIndex(window.name));
                }
            } else {
                //提示错误消息
                fsCommon.errorMsg(data[msgName]);
            }
        }, false);
    };

    var fsForm = new FsForm();
    //绑定按钮
    exports("fsForm", fsForm);
});
