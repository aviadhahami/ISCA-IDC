'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Userroleasenumservice','$q','NewsGetterService','$window','facebookService',
    function($scope, Authentication, Userroleasenumservice,$q,NewsGetterService,$window,facebookService) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;


        // TODO: Get Facebook page posts (ISCAorg) using Graph API

        //console.log($scope.userLevel);
        // Controls the participant / volunteer overview tabs
        $scope.participationType = 'participant';
        $scope.changeParticipationType = function (type) {
            if (type !== 'participant' && type !== 'volunteer')
                type = 'participant';
            $scope.participationType = type;
        };

        // Content for FAQ section
        $scope.faqEntries = [
            {
                index:    1,
                question: "Why should my university get in on this?",
                answer:   "This  program was introduced to the academic world so that there could be a strong and  unimpaired backbone to our cause. Higher education institutes have been working to promote community service and extracurricular activities for the past decade, believing that students can benefit both themselves and their environment by taking part in such actions. With the rise of the virtual world, hatred now spreads faster and in a more destructive way - disguising itself as freedom of speech and mostly comes from anonymous sources. Nevertheless, we are now capable of facing global scale issues. We have the option of researching into how hatred is spread through viral propaganda, disproof prejudice and even establish legal clinics that can help cope with ongoing violations. Antisemetism is on a constant rise. Jews are being beaten in streets and are forced to move in order to avoid ongoing discrimination. We hope to expand into other academic institutions, enroll students that can help with combating these occurrences while gaining academic knowledge that will eventually create a rise in awareness and a decline in unfortunate instances."
            },
            {
                index:    2,
                question: "Why should my university get in on this?",
                answer:   "This  program was introduced to the academic world so that there could be a strong and  unimpaired backbone to our cause. Higher education institutes have been working to promote community service and extracurricular activities for the past decade, believing that students can benefit both themselves and their environment by taking part in such actions. With the rise of the virtual world, hatred now spreads faster and in a more destructive way - disguising itself as freedom of speech and mostly comes from anonymous sources. Nevertheless, we are now capable of facing global scale issues. We have the option of researching into how hatred is spread through viral propaganda, disproof prejudice and even establish legal clinics that can help cope with ongoing violations. Antisemetism is on a constant rise. Jews are being beaten in streets and are forced to move in order to avoid ongoing discrimination. We hope to expand into other academic institutions, enroll students that can help with combating these occurrences while gaining academic knowledge that will eventually create a rise in awareness and a decline in unfortunate instances."
            }
        ];

        // Returns true if using mobile device (phone / tablet / etc.)
        // based on WURFL.js service from http://web.wurfl.io/
        $scope.isMobile = function () {
            return WURFL.is_mobile;
        };
        var populateNews = function(){
            $scope.loadingNews = true;
            $q.all([NewsGetterService.getMagazinePosts(),NewsGetterService.getBlogPosts()]).then(function(values){
                $scope.loadingNews = false;
                // Slicing to get only 10 and not overkill client
                $scope.sections[1].data=values[0].data.slice(0,9);
                $scope.sections[2].data = values[1].data.slice(0,9);

            });
        };
        var initFacebook = function(){
            $window.fbAsyncInit = function() {
                FB.init({
                    appId: '187226808279553',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.4'
                });
                $scope.facebookLoaded= true;
            };
            (function(d){
                var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = '//connect.facebook.net/en_US/sdk.js';
                d.getElementsByTagName('head')[0].appendChild(js);
            }(document));
        };
        var populateFacebookFeed = function(){
            $scope.loadingFacebookFeed = true;
            if($scope.facebookLoaded){
                facebookService.getPostsFromIsca().then(function(response){
                    console.log(response);
                    $scope.loadingFacebookFeed = false;
                    $scope.sections[0].data = response.data;
                },function(err){
                    $scope.loadingFacebookFeed = false;
                    console.log(err)
                })
            }else{
                console.log('FB isnt loaded yet')
            }
        };
        var init = function(){
            populateNews();
            initFacebook();
            populateFacebookFeed();

            // Look when facebook is loaded
            $scope.$watch('facebookLoaded',function(o,n){
                populateFacebookFeed();
            })
        };

        init();

        $scope.stringifyDate = function(date){
            var time = new Date(date);
            var yyyy = time.getFullYear().toString();
            var mm = (time.getMonth()+1).toString();
            var dd = time.getDate().toString();
            return (dd[1]?dd:"0"+dd[0]) +'/' +  (mm[1]?mm:"0"+mm[0]) +'/' + yyyy;
        };
        // Sections implementation
        $scope.sections = [
            {
                title:'News feed',
                data:[]
            },
            {
                title:'Magazine',
                data:[]
            },
            {
                title:'Blog',
                data:[]
            }

        ]
    }
]);
