/**
 *
 *
 */
var creepRoles = {

    /**
     *
     */
    checkCreepAssignment: function(creep) {

    }

    /**
     *
     */
    assignFixerSource: function(creep) {

    },

    /**
     *
     */
    assignBuilderSource: function(creep) {

    },

    /**
     *
     */
    assignBuilderSource: function(creep) {

    },

    /**
     *
     */
    assignHarvesterSource: function(creep) {
        creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;

        // Find all sources
        var sources = creep.room.find(FIND_SOURCES);

        // Find source with least assignments
    }
};

module.exports = creepRoles;