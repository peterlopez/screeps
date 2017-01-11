// https://raw.githubusercontent.com/screeps/tutorial-scripts/master/section5/role.harvester.js

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
    	// Fill 'er up!
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var targetSource = sources[0];

            // Find source that isn't depleted
            for(var name in sources) {
            	if(sources[name].energy > 0) {
            		targetSource = sources[name];
            	}
            }
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource);
            }
        }
        // Deposit our payload
        else {
        	// Find targets for our energy
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                }
            });
            
            // Find containers to store energy
            var containers = creep.room.find(FIND_STRUCTURES, {
            	filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store < structure.storeCapacity;
                }
            });
            
            targets = targets.concat(containers);
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleHarvester;