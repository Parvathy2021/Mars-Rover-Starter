const Command = require("./command");
const Message = require("./message");

class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   
   receiveMessage(message){
      let results = [];
      for(let command of message.commands){
         let result= this.executeCommand(command);
         results.push(result);
      }
      return {
         message: message.name,
         results:results,
      };

   }
   executeCommand(command){
      if(command.commandType === 'MOVE'){
         if(this.mode === 'LOW_POWER'){
            return {completed : false};
         }
         this.position = command.value;
         return {completed : true};

      }else if(command.commandType === 'STATUS_CHECK'){
         return{
            completed: true,
            roverStatus:{
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
         };
      }else if (command.commandType === 'MODE_CHANGE'){
         this.mode =command.value;
         return {completed: true};
      }
   }
 }
 let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
 let message = new Message('Test message with two commands', commands);
 let rover = new Rover(98382);    // Passes 98382 as the rover's position.
 let response = rover.receiveMessage(message);

 console.log(response);

module.exports = Rover;