angular.module("harnessing", [])
    .controller("HarnessingCtrl", function ($scope) {

//     $scope.console = [{value:"teste"},{value:"teste2"}];

        $scope.config = [
            {id: "userName", nome: "Nome de Usuário", tipo: "campo"},
            {id: "email", nome: "E-mail", tipo: "campo"},
            {id: "serie", nome: "Série", tipo: "campo"},
            {id: "matricula",nome: "Matricula", tipo: "campo"},
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
                            if ($scope.config) {
                                $scope.config.forEach(function (item) {
                                    tpl = tpl + '<div debug="value.' + item.id + '" type="' + item.tipo + '" t-name="' + item.nome + '"></div>';
                                });
                            }
                            break;
                        case "campo":
                            tpl = tpl + '<label><h6>'+$attrs.tName+'</h6></label>';
                            tpl = tpl + '<input ng-model="value"></input>';
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

                    }
                    ;
                    $compile(tpl)($scope, function (el) {
                        $element.html('').append(el);
                    });
                };
                $attrs.$observe('type', setContent);
                if (!$attrs.type) {
                    setContent();
                }

            }
            , scope: {
                value: '=debug',
                config: '='
            }

        };


    });