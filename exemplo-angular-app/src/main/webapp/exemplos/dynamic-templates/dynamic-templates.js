angular.module("course",[])
    .controller("CourseCtrl", function($scope){

        $scope.user = {
            name: "Eder",
            username: "ederbd",
            email:"ederbd@gmail.com",
            id:123
        };

        $scope.log= [
            "minha primeira mensagem",
            "outra mensagem",
            "...caindo fora, fui!..."
        ];


    })
    .filter("type",function(){

        return function(val){
            var type= typeof(val);
            if (type === "Object"){
                return Object.prototype.toString.call(val);
            }else{
                return type;
            }
        };


    })
    .directive("debug",function(){
        var defaultType = "json";
        return {
            scope : {
                value : '=debug'
            },
            //restrict : "A",
            template :
                function(tElement, tAttrs){
                    var type = tAttrs["type"] || defaultType;
                    var obj = tAttrs["debug"];
                    var tpl = "";

                    switch (type){

                        case "json" :
//                  tpl =  '<h1>Meu JSON Nome: {{value["name"]}}</h1>'+
//                  '<h1>Meu JSON Apelido: {{value.username}}</h1>'+
//                      '<h1>Meu JSON E-mail: {{value.email}}</h1>';
//                  tpl =  tpl + '</br></br><h1>Meu JSON Completo:</h1>';
                            tpl =  tpl +'<br><pre ng-bind="value | json"></pre>';
//                
                            break;



                        case "X" :
//                  tpl =  '<h1>Meu JSON Nome: {{value["name"]}}</h1>'+
//                  '<h1>Meu JSON Apelido: {{value.username}}</h1>'+
//                      '<h1>Meu JSON E-mail: {{value.email}}</h1>';
//                  tpl =  tpl + '</br></br><h1>Meu JSON Completo:</h1>';
                            tpl =  tpl +'<br><pre ng-bind="value | json"></pre>';
//                
                            break;
                        case "type" :
                            tpl = '<pre>O tipo (Filtrado) é: {{value | type}}</pre>';
                            break;
                        case "array" :
                            var innerType = tAttrs["innerType"] || defaultType;
                            tpl = '<div ng-repeat="el in value" debug="el" type"' + innerType + '">{{el}}</div>';
//                 tpl = tpl + '<div ng-repeat="el in value">{{el}}</div>';
                            break;
                        case "full" :
                            tpl = '<div debug="value" type="type"></div><div debug="value" type="json"></div>';
                            break;
                        default :
                            tpl = '<b>Desconhecido debug type "'+type+'" for </b><pre>{{value}}</pre>';
                            break;

                    };


                    return tpl;
                }


        };




    })