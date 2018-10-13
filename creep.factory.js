/**
 * Determines which type of creeps are built
 * and how creeps are built
 */
var creepFactory = {};

const CREEP_BODY_PARTS = {
    'harvester' : [WORK, WORK, WORK, CARRY, MOVE],
    'upgrader'  : [WORK, WORK, WORK, CARRY, MOVE],
    'builder'   : [WORK, CARRY, CARRY, MOVE, MOVE],
    'fixer'     : [WORK, CARRY, CARRY, MOVE, MOVE],
};
const CREEPS_QUOTA = {
    'harvester': 4,
    'upgrader': 3,
    'builder': 2,
    'fixer': 2,
};

/**
 * Determine what kind of creep to produce
 * based on current creep roles and quotas
 */
creepFactory.getNewCreepRole = function() {
    var newRole;
    var diff = 0; // descrepency between creep count and quota
    var creepRoles = require('utils').getCreepsByRole();

    // Loop through each creep role
    // comparing counts with quotas
    for(var role in creepRoles) {
        var currentDiff = CREEPS_QUOTA[role] - creepRoles[role].length;

        newRole = currentDiff > diff ? role : newRole;
        diff = currentDiff > diff ? currentDiff : diff;
    }

    if(diff == 0) {
        return false;
    }
    return newRole;
};

/**
 * Spawns creep with given body parts based on role
 */
creepFactory.createCreep = function(role) {
    return Game.spawns['Spawn1'].createCreep(CREEP_BODY_PARTS[role], undefined, {role: role});
}

module.exports = creepFactory;