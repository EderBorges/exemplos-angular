angular.module("harnessing", [])
    .controller("HarnessingCtrl", function ($scope) {
    
//     $scope.console = [{value:"teste"},{value:"teste2"}];

        $scope.config = [
            {nome: "userName", tipo: "campo"},
            {nome: "email", tipo: "campo"},
            {nome: "serie", tipo: "campo"},
            {nome: "matricula", tipo: "campo"},
        ];
   
    
    
        $scope.aluno = {
            id: "123"
            , userName: "Ederbd"
            , email: "ederbd@gmail.com"
            , serie: "1º ano"
            , matricula: "213132"
        };



    })
    .filter("type", function () {


        return function (val) {
            var type = typeof (val);
            if (type === 'object') {
                return Object.prototype.toString.call(val);
            } else {
                return type;
            }
        };


    })
    .directive("debug", function ($compile) {
        var defaultType = "ini";

        return {

            link: function ($scope, $element, $attrs) {

                var setContent = function (type) {
                    var tpl = '';
                    type = type || defaultType;
                    switch (type) {
                    case "ini":
                        $scope.config.forEach(function(item,index,arr){
                            tpl = tpl + '<div debug="value.'+item.nome+'" type="'+item.tipo+'"></div>';
                        });
                        break;     
                    case "campo":
                            tpl = tpl + '<input ng-model="value"></input>{{value}}';
                        break;                            
                    case "json":
                            tpl = tpl + '<pre ng-bind="value | json"> </pre>';
                        break;
                    case "type":
                        tpl = '<pre> Type : {{value | type}} </pre>';
                        break;
                    case "array":
                        var innerType = $attrs.innerType || defaultType;
                        tpl = '<div ng-repeat="el in value" debug="el" type="' + innerType + '">{{el}}</div>';
                        break;
                    case "full":
                        tpl = '<div debug="value" type="type"></div><div debug="value" type="json"></div>';
                        break;

                    default:
                        tpl = '<b>Tipo desconhecido "' + type + '" de </b><pre> {{value}} </pre>';
                        break;

                    };
                    $compile(tpl)($scope, function (el) {
                        $element.html('').append(el);
                    });
                };
                $attrs.$observe('type', setContent);
                setContent();

            }
            , scope: {
                value: '=debug',
                config: '='
            }

        };


    });