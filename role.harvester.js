/**
 * Gathers energy from Sources then
 * stores it in nearest available container
 */
var roleHarvester = {};

/**
 * Action taken on game tick
 */
roleHarvester.run = function(creep)
{
    if(creep.carry.energy < creep.carryCapacity) {
        this.gather(creep);
    }
    else {
        this.depositPayload();
    }
};

/**
 * Move to assigned source and gather
 */
roleHarvester.gather = function(creep)
{
    //var targetSource = Game.getObjectById(creep.memory.sourceId);
    var sources = creep.room.find(FIND_SOURCES);
    var targetSource = sources[1];

    if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSource);
    }
};

/**
 * Move to and deposit energy to storage
 */
roleHarvester.depositPayload = function()
{
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
        }
    });
    
    /*
    // Find containers to store energy
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store < structure.storeCapacity;
        }
    });
    targets = targets.concat(containers);
    */

    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
};

module.exports = roleHarvester;