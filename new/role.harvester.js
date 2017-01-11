/**
 *
 *
 */
var roleHarvester = {

    /**
     *
     */
    run: function(creep) {
        if( !creep.memory.sourceId ) {
            this.assignSource(creep);
        }

        if(creep.carry.energy < creep.carryCapacity) {
            this.harvest(creep);
        }
        else {
            this.depositPayload();
        }
    },

    /**
     *
     */
    harvest: function(creep)
    {
        var targetSource = Game.getObjectById(creep.memory.sourceId);

        if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetSource);
        }
    },

    /**
     *
     */
    depositPayload: function()
    {
        // Find places to store energy
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
    }
};

module.exports = roleHarvester;