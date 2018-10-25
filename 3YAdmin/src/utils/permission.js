let permission = {}

permission.check = function (config) {
    if (config.permission && config.permission.length > 0) {
        const neededPermissions = config.permission;
        const userPermissions = JSON.parse(localStorage.getItem('permission'));
        const isAdmin = localStorage.getItem('isAdmin');
        const hasPermission = userPermissions.some(s => {
            return neededPermissions.indexOf(s) > -1;
        })
        if (!hasPermission && isAdmin == 0) {
            return false
        }
    }
    return true
}

export default permission