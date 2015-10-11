'use strict';

angular.module('core').controller('TeamController', ['$scope',
    function($scope) {
        $scope.team = [
            { name: 'Roy Meirom', title: 'Program Manager', img: 'modules/core/img/team/male_avatar.png', index: 1 },
            { name: 'Adi Goldshtein', title: 'Program Coordinator', img: 'modules/core/img/team/female_avatar.png', index: 2 },
            { name: 'Aviad Hahami', title: 'Technology Manager', img: 'modules/core/img/team/male_avatar.png', index: 3 },
            { name: 'Shay Goldman', title: 'MEAN Ninja', img: 'modules/core/img/team/ninja_avatar.png', index: 4 },
            { name: 'Ori Avraham', title: 'MEAN Ninja', img: 'modules/core/img/team/ninja_avatar.png', index: 5 },
            { name: 'Omer Karjevsky', title: 'MEAN Ninja', img: 'modules/core/img/team/ninja_avatar.png', index: 6 }
        ];
    }
]);
