module.exports = {
    
    getCreepsRoleCount: function() {
    	var allCreeps = this.getCreepsByRole();

    	var numHarvesters = allCreeps.harvester.length;
    	var numBuilders = allCreeps.builder.length;
    	var numUpgraders = allCreeps.upgrader.length;
    	var numFixers = allCreeps.fixer.length;

        console.log("Harvesters: "+numHarvesters);
        console.log("Builder: "+numBuilders);
        console.log("Upgraders: "+numUpgraders);
        console.log("Fixers: "+numFixers);

        return { numHarvesters: 'harvesters', numBuilders: 'builders', numUpgraders: 'upgraders', numFixers: 'fixers' };
    },

    getCreepsByRole: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');

        return {'harvester': harvesters, 'builder': builders, 'upgrader': upgraders, 'fixer': fixers};
    }
};