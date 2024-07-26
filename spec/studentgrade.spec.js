const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// This file is for grading tests. Please do not edit this file for any reason.

describe("GRADING TEST: ", function() {

   it("Responds to TA message & commands", function() {
    let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('TA power');
    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].roverStatus.position).toEqual(4321);
    expect(response.results[2].completed).toBeTruthy();
    expect(response.results[3].completed).toBeFalsy();
    expect(response.results[4].roverStatus.position).toEqual(4321);
    expect(response.results[4].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[4].roverStatus.generalWatts).toBe(110);
   });

});
