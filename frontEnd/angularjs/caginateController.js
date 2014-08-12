function enablePagination($scope, onChangeFunction) {

  $scope.currentPage = 1;
  $scope.perPage = 10;

  /* Startup */
  onChangeFunction();

  /* Pagination Functions */

  $scope.previousPage = function() {
    if ($scope.currentPage == 1) {
      return;
    }
    $scope.currentPage--;
    onChangeFunction();
  };

  $scope.nextPage = function() {
    if ($scope.currentPage == $scope.pages.length) {
      return;
    }
    $scope.currentPage++;
    onChangeFunction();
  };

  $scope.firstPage = function() {
    if ($scope.currentPage == 1) {
      return;
    }
    $scope.currentPage = 1;
    onChangeFunction();
  };

  $scope.lastPage = function() {
    if ($scope.currentPage == $scope.pages.length) {
      return;
    }
    $scope.currentPage = $scope.pages.length;
    onChangeFunction();
  };

  $scope.setPage = function(page) {
    if (page == $scope.currentPage) {
      return;
    }
    $scope.currentPage = page;
    onChangeFunction();
  };

  $scope.setPerPage = function(perPage) {
    if (perPage == $scope.perPage) {
      return;
    }
    $scope.perPage = perPage;
    onChangeFunction();
  };

  $scope.pageClass = function(page) {
    if (page == $scope.currentPage) {
      return 'current';
    } else {
      return null;
    }
  };

  $scope.perPageClass = function(perPage) {
    if (perPage == $scope.perPage) {
      return 'current';
    } else {
      return null;
    }
  }
}
