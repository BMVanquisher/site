(function () {
    'use strict';

    angular.module('app').controller('ModCtrl', function ($scope, $modal) {
        $scope.openModal = function () {
            $modal.open({
                templateUrl: 'app/components/modal.html ',
                size: 'lg',
                windowClass: 'full',
                controller: function ($scope, $modalInstance) {
                    $scope.closeForm = function () {
                        $modalInstance.dismiss();
                    };
                }
            });
        };
       
    });
})();
