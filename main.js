var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');

module.exports.loop = function () {
    // Clear decesed creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Build new things when Spawn and all extensions are full
    // will create equal number of builders, harvesters, and upgraders
    var extensionsFull = true;
    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });
    for(var name in extensions) {
        if(extensions[name].energy < extensions[name].energyCapacity) {
            extensionsFull = false;
        }
    }
    
    if(Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity && extensionsFull) {
        var creepFactory = require('creep.factory');
        var newCreepRole = creepFactory.getNewRole();
        if(newCreepRole) {
            console.log("Spawning new '"+newCreepRole+"'");
            creepFactory.createCreep(newCreepRole);
        }
    }
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        }
    }
}