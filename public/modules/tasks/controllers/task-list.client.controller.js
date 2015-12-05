'use strict';

angular.module('tasks').controller('TaskListController', ['$scope', 'Authentication', 'Userroleasenumservice',
    function($scope, Authentication, Userroleasenumservice) {
        // This provides Authentication context.
        $scope.user = Authentication.hasOwnProperty('user') ? Authentication.user : null;
        $scope.userLevel = $scope.user ? Userroleasenumservice.getValue($scope.user.roles) : 0;

        // returns true if passed date is within 7 days before today
        $scope.createdThisWeek = function(date) {
        	var oneWeekAgo = new Date();
			oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
			if (date > oneWeekAgo) 
				return true;
			return false;
        }

       	$scope.stringifyDate = function(date){
            var time = new Date(date);
            var yyyy = time.getFullYear().toString();
            var mm = (time.getMonth()+1).toString();
            var dd = time.getDate().toString();
            return (dd[1]?dd:"0"+dd[0]) +'/' +  (mm[1]?mm:"0"+mm[0]) +'/' + yyyy;
        };

        // Sections implementation
        $scope.categories = [
	        {
	        	title: "Facebook"
	        },
	        {
	        	title: "Twitter"
	        },
	        {
	        	title:"Wikipedia"
	        },
	        {
	        	title: "Facebook"
	        },
	        {
	        	title: "Twitter"
	        },
	        {
	        	title:"Wikipedia"
	        },
	        {
	        	title: "Facebook"
	        },
	        {
	        	title: "Twitter"
	        },
	        {
	        	title:"Wikipedia"
	        }
       	];
        $scope.taskList = [
            {
                title:'News feed',
                type: 'Facebook',
                created: new Date(2006,1,1),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'hey there',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerk',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyho',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerkkk',
                status: 'done',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                closed: Date.now(),
                closedBy: 'Omer!'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYY'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYYooo'
            },
            {
                title:'News feed',
                type: 'Facebook',
                created: new Date(2006,1,1),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'hey there',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerk',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyho',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerkkk',
                status: 'done',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                closed: Date.now(),
                closedBy: 'Omer!'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYY'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYYooo'
            },
            {
                title:'News feed',
                type: 'Facebook',
                created: new Date(2006,1,1),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'hey there',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerk',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyho',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerkkk',
                status: 'done',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                closed: Date.now(),
                closedBy: 'Omer!'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYY'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYYooo'
            },
            {
                title:'News feed',
                type: 'Facebook',
                created: new Date(2006,1,1),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'hey there',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerk',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyho',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerkkk',
                status: 'done',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                closed: Date.now(),
                closedBy: 'Omer!'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYY'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYYooo'
            },
            {
                title:'News feed',
                type: 'Facebook',
                created: new Date(2006,1,1),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'hey there',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerk',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyho',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omerkkk',
                status: 'done',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                closed: Date.now(),
                closedBy: 'Omer!'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'new',
                description: 'hellowwwwwwwww',
                content: 'please add content',
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYY'
            },
            {
                title:'heyheyhey',
                type: 'Facebook',
                created: Date.now(),
                createdBy: 'Omer',
                status: 'active',
                description: 'hellowwwwwwwww',
                content: 'please add content',
                taken: Date.now(),
                takenBy: 'HEYYYYYooo'
            },
        ]
    }
]);
