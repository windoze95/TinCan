angular.module('TinCan')
    .controller('chatController', ['$scope', '$http', function($scope, $http){
        var chat = this;
        chat.chatMessage = ''
        chat.messageHistory = []

        console.log('CALLING SOCKET')
        // var socket = io()
        socket.on('chatMessage', function(data){
            console.log('chat message? ', data)
            chat.messageHistory.push(data)
            $scope.$apply()
        })

        socket.on('spawnChat2', function(id){
            chat.messageHistory = []
            chat.currentId = id;
        });

        chat.sendMessage = function(event){

            // check if the key pressed was the return
            if ( event.which === 13 ) {
                if ( chat.chatMessage[0] != '/' ) {
                    socket.emit('chatMessage', {
                        message: chat.chatMessage,
                        chatId: chat.currentId
                    })
                }
                chat.chatMessage = ''
            }
        }
    }])
//     .controller('Shell', [ Shell ]);
//
// function Shell() {
//
//   var vm = this;
//
//   vm.messages = [];
//
//   vm.username = 'Anon User';
//
//   vm.sendMessage = function(message, username) {
//     if(message && message !== '' && username) {
//       vm.messages.push({
//         'username': username,
//         'content': message
//       });
//     }
//   };
//   vm.visible = true;
//   vm.expandOnNew = true;
// }
