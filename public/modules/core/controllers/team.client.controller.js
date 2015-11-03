'use strict';

angular.module('core').controller('TeamController', ['$scope',
    function($scope) {
        $scope.team = [
            { name: 'Roy Meirom', title: ['Program Manager'], img: 'modules/core/img/team/Roy.jpg', index: 1 },
            { name: 'Adi Goldshtein', title: ['Program Coordinator'], img: 'modules/core/img/team/Adi.jpg', index: 2 },
            { name: 'Aviad Hahami', title: ['Founder','Program Director'], img: 'modules/core/img/team/Aviad.jpg', index: 3 },
            { name: 'Shay Goldman', title: ['MEAN Ninja'], img: 'modules/core/img/team/Shay.jpg', index: 4 },
            { name: 'Ori Avraham', title: ['MEAN Ninja'], img: 'modules/core/img/team/Ori.jpg', index: 5 },
            { name: 'Omer Karjevsky', title: ['MEAN Ninja'], img: 'modules/core/img/team/Omer.jpg', index: 6 }
        ];
    }
]);
