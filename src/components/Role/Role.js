class Role {
    j
    constructor(name, acceptMembers, modifyRoles, rank) {
        this.name = name;
        this.readCategories = [];
        this.writeCategories = [];
        this.acceptMembers = acceptMembers;
        this.rank = rank;
    }

    mergeRoles(role){
        let newRole = {...role}
        newRole.readCategories.concat(this.readCategories);
        newRole = newRole.readCategories.filter(onlyUnique);
        newRole.writeCategories.concat(this.writeCategories);
        newRole = newRole.writeCategories.filter(onlyUnique);
        newRole.acceptMembers |= this.acceptMembers;
        newRole.modifyRoles |= this.modifyRoles;
        newRole.rank = Math.min(newRole.rank,this.rank);
    }
}

export default Role;

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
