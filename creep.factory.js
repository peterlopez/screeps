/**
 * Determines which type of creeps are built
 * and how creeps are built
 */
var creepFactory = {};

const CREEP_BODY_PARTS = {
    'harvester' : [WORK, WORK, WORK, CARRY, MOVE],
    'upgrader'  : [WORK, WORK, WORK, CARRY, MOVE],
    'builder'   : [WORK, CARRY, CARRY, MOVE, MOVE],
    'fixer' 	: [WORK, CARRY, CARRY, MOVE, MOVE],
};
const CREEPS_QUOTA = {
    'harvester': 4,
    'upgrader': 3,
    'builder': 2,
    'fixer': 2,
};

/**
 * 
 */
creepFactory.getNewCreepRole = function() {
	console.log("todo");
};

/**
 *
 */
creepFactory.createCreep = function(role) {
	console.log("todo");
}

module.exports = creepFactory;