(function () {
    'use strict';

    angular.module('app').controller('ModCtrl', function ($scope, $modal, $http, $sce) {
        $http.get('../app/source/news').success(function (response) {
            $scope.news = response;
            $scope.selectedItem = $scope.news[0];
            var body = $scope.selectedItem.Body;
            $scope.isHtml = (body.search(/<p>/i) !== -1 || body.search(/<\/p>/i) !== -1 || body.search(/<b>/i) !== -1 || body.search(/<\/b>/i) !== -1 || body.search(/<br>/i) !== -1) ? true : false;
        });
        $scope.openModal = function (){
            $modal.open({
                templateUrl: 'app/components/modal.html ',
                size: 'lg',
                windowClass: 'full',
                resolve: {
                    news: function () {
                        return $scope.news;
                    }
                },
                controller: function ($scope, $modalInstance, news, $http) {
                    $scope.news = news;
                    $scope.closeForm = function () {
                        $modalInstance.dismiss();
                    };
                    $scope.addForm = function (item) {
                        item.Body = $scope.text;
                        $scope.news.push(item);
                        var send = $scope.news;
                        $http.post('../app/source/news', send, { 'Content-Type': 'application/json' }).success(function () {
                            console.log("was added " );
                        });
                        $modalInstance.dismiss();
                    };
                }
            });
        };
        $scope.openModalEdit = function (item) {
            $modal.open({
                templateUrl: 'app/components/editModal.html ',
                size: 'lg',
                windowClass: 'full',
                resolve: {
                    item: function () {
                        return item;
                    },
                    news: function () {
                        return $scope.news;
                    }
                },
                controller: function ($scope, $modalInstance, item, news) {
                    $scope.selectedItem = item;
                    $scope.news = news;
                    angular.forEach($scope.news, function (value, key) {
                        if (value === $scope.selectedItem) {
                            $scope.id=key;
                        }
                    });
                    $scope.closeForm = function () {
                        $modalInstance.dismiss();
                    };
                    $scope.editForm = function (item) {
                        $scope.news[$scope.key]=item;
                        var send = $scope.news;
                        $http.post('../app/source/news.json', send, { 'Content-Type': 'application/json' }).success(function () {
                            console.log("was added ");
                        });
                        $modalInstance.dismiss();
                    };
                }
            });
        };
        $scope.changeSelectedItem = function(item) {
            $scope.selectedItem = item;
            var body = item.Body;
            $scope.isHtml = (body.search(/<p>/i) !== -1 || body.search(/<\/p>/i) !== -1 || body.search(/<b>/i) !== -1 || body.search(/<\/b>/i) !== -1 || body.search(/<br>/i) !== -1) ? true : false;
        };
        $scope.getHtml = function () {
            return $sce.trustAsHtml($scope.selectedItem.Body);
        };
    });
})();
