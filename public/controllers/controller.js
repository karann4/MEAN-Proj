function AppCtrl ($scope, $http){
    console.log('checker')

var refresh = function(){
    $http.get('/contactlist').success((res)=> {
        console.log('data in controller')
          $scope.contactlist = res;
          $scope.contact = ""
    })
}

refresh();

    $scope.addContact = function(){
        // console.log($scope.contact)
        $http.post('/contactlist', $scope.contact).success((res)=>{
           
            console.log('here',res)
            refresh();
        })
    }

    $scope.remove = function(id)
    {
        $http.delete('/contactlist/'+id).success((res)=>{
           
            // console.log('here',res)
            refresh();
        }) 
    }

    $scope.edit = function(id)
    {
        $http.get('/contactlist/'+id).success((res)=>{
           
            $scope.contact = res
            // console.log('here',res)
      
        }) 
    }

    $scope.update = function()
    {
        $http.post('/contactlist/'+$scope.contact._id,$scope.contact).success((res)=>{
           
            $scope.contact = res
            refresh();
            // console.log('here',res)
      
        }) 
    }

  
}