'use strict';

angular.module('app', ['ngRoute', 'ngAnimate', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngStorage'])
    .config(function ($routeProvider) {
        $routeProvider.when('/main', { templateUrl: 'partials/main.html', controller: 'mainController' });
        $routeProvider.otherwise({ redirectTo: '/main' });
    });


angular.module('app')
    .controller('mainController', ['$scope', '$sessionStorage',
        function ($scope, $sessionStorage) {

            //Start Options
            $scope.startNewGame = function () {
                //Create Blocks Default Value
                $scope.blocksArray = [];
                for (var i = 0; i < 9; i++){
                    $scope.blocksArray.push(
                        {
                            'id': i,
                            'value': null,
                            'win': 0
                        }
                    );
                }
                $scope.activePerson = 'none';
                $scope.selected = false;
                $scope.info = 'Kto zaczyna grę?';
            };

            //Chose person
            $scope.startPerson = function (person) {
                $scope.info = 'Teraz kolej dla:';
                $scope.activePerson = person;
                $scope.selected = true;
            };

            var checkWin = function () {
                var winOptionsArray = [
                    // Horizontal
                    ['0', '1', '2'],
                    ['3', '4', '5'],
                    ['6', '7', '8'],
                    // Vertical
                    ['0', '3', '6'],
                    ['1', '4', '7'],
                    ['2', '5', '8'],
                    // Askew
                    ['0', '4', '8'],
                    ['2', '4', '6']
                ];

                for (var j = 0; winOptionsArray.length > j; j++) {
                    if ($scope.blocksArray[winOptionsArray[j][0]].value == $scope.blocksArray[winOptionsArray[j][1]].value && $scope.blocksArray[winOptionsArray[j][0]].value != null && $scope.blocksArray[winOptionsArray[j][0]].value == $scope.blocksArray[winOptionsArray[j][2]].value) {
                        for (var k = 0; $scope.blocksArray.length > k; k++){
                            if ($scope.blocksArray[k].id == winOptionsArray[j][0] || $scope.blocksArray[k].id == winOptionsArray[j][1] || $scope.blocksArray[k].id == winOptionsArray[j][2]) {
                                $scope.blocksArray[k].win = 1;
                            }
                        }
                        $scope.activePerson = 'none';
                        $scope.info = 'Koniec gry!';
                        $scope.win = true;
                    }
                }
            };


            //Set block value if not use, and check win option, then switch active person.
            $scope.setValue = function (id) {
                if ($scope.blocksArray[id].value == null && $scope.activePerson != 'none') {
                    $scope.blocksArray[id].value = $scope.activePerson;
                    $scope.activePerson = !$scope.activePerson;
                    checkWin();

                    //Add to sesion storage
                    $sessionStorage.exist = true;
                    $sessionStorage.activePerson = $scope.activePerson;
                    $sessionStorage.info = $scope.info;
                    $sessionStorage.blocksArray = $scope.blocksArray;
                }
            };


            //Check old session exist
            if ($sessionStorage.exist == true) {
                $scope.activePerson = $sessionStorage.activePerson;
                $scope.info = $sessionStorage.info;
                $scope.blocksArray = $sessionStorage.blocksArray;
                $scope.selected = true;
            } else {
                $scope.startNewGame();
            }

            console.log("  _________________________\n< Chyba ca\u0142kiem dzia\u0142a :) >\n  -------------------------\n         \\   ^__^ \n          \\  (oo)\\_______\n             (__)\\       )\\/\\\n                 ||----w |\n                 ||     ||\n    ");
        }
    ]);