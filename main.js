// https://raw.githubusercontent.com/screeps/tutorial-scripts/master/section5/main.js

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairman = require('role.repairman');

const CREEP_BODY_PARTS = {
    'harvester' : [WORK, WORK, WORK, CARRY, MOVE],
    'upgrader'  : [WORK, WORK, WORK, CARRY, MOVE],
    'builder'   : [WORK, CARRY, CARRY, MOVE, MOVE],
    'repairman' : [WORK, CARRY, CARRY, MOVE, MOVE],
};
const MAX_CREEPS = {
    'harvester': 4,
    'upgrader': -1,
    'builder': 2,
    'repairman': 2,
};

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
        
        // Get total amount of each creep
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var repairman = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairman');
    
        // Find creep type with least amount of creeps
        var allCreeps = {'harvester': harvesters, 'builder': builders, 'upgrader': upgraders, 'repairman': repairman};
        var leastCreeps = allCreeps.upgrader.length;
        var leastCreepsType = 'upgrader';

        for(var type in allCreeps) {
            var numCreepsOfType = allCreeps[type].length;

            // Skip creep type if already at max
            if( numCreepsOfType >= MAX_CREEPS[type] && MAX_CREEPS[type] !== -1 ) {
                continue;
            }
            if( allCreeps[type].length < leastCreeps ) {
                leastCreeps = allCreeps[type].length;
                leastCreepsType = type;
            }
        }
        console.log("'Least creeps are '"+leastCreepsType+"' with only: "+leastCreeps+" creeps");
        console.log("Spawn1 at capacity, building: '"+leastCreepsType+"'");
        
        Game.spawns['Spawn1'].createCreep(CREEP_BODY_PARTS[leastCreepsType], undefined, {role: leastCreepsType});
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
        if(creep.memory.role == 'repairman') {
            roleRepairman.run(creep);
        }
    }
}