import model from '../models/baseModel'
import functionService from './functionService'
import userService from './userService'
import _ from 'lodash'
const context = 'menu'
let buildMenu = (parentMenu, menuList) => {
    parentMenu.children = []
    let children = menuList.filter((item) => {
        return item.parentId == parentMenu.id
    })
    for (let menu of children) {
        buildMenu(menu, menuList)
    }
    parentMenu.children.push(...children)
}
let buildAccessMenu = (parentMenu, menuList, userPermission) => {
    parentMenu.children = []
    let children = menuList.filter((item) => {
        return item.parentId == parentMenu.id && (!item.functionCode || userPermission.indexOf(item.functionCode) > -1)
    })
    //父级没有权限访问，子级也不能访问
    for (let menu of children) {
        buildAccessMenu(menu, menuList, userPermission)
    }
    parentMenu.children.push(...children)
}
let checkAccssMenu = (accessMenuList, menuList) => {
    for (let item of accessMenuList) {
        if (item.children) {
            checkAccssMenu(item.children, menuList)
        }
    }
    _.remove(accessMenuList, (item) => {
        return item.children.length == 0 && menuList.some(s => {
            return s.parentId == item.id
        })
    });
}
let menuService = {
    getMenuList: async () => {
        let db = await model.init(context)
        let menuList = JSON.parse(JSON.stringify(db.value()))
        menuList = _.sortBy(menuList, ["sort"])
        let parentMenuList = menuList.filter((item) => {
            return item.parentId === 0
        })
        for (let menu of parentMenuList) {
            buildMenu(menu, menuList)
        }
        return parentMenuList
    },
    getAccessMenuList: async (userId) => {
        let db = await model.init(context)
        let menuList = JSON.parse(JSON.stringify(db.value()))
        menuList = _.sortBy(menuList, ["sort"])
        let parentMenuList = menuList.filter((item) => {
            return item.parentId == 0 && !item.isLock
        })
        let isAdmin = await userService.isAdmin(userId)
        let userPermission = await userService.getUserPermission(userId)
        if (isAdmin) {
            for (let menu of parentMenuList) {
                buildMenu(menu, menuList)
            }
        } else {
            for (let menu of parentMenuList) {
                buildAccessMenu(menu, menuList, userPermission)
            }
        }
        checkAccssMenu(parentMenuList, menuList)
        return parentMenuList
    },
    saveMenu: async (menu) => {
        let db = await model.init(context)
        let exist = db.find({ name: menu.name }).value()
        if (exist && exist.id != menu.id) {
            return {
                success: false,
                msg: "名称已经存在"
            }
        }
        if (menu.id) {
            await db.find({ id: menu.id })
                .assign(menu)
                .write()
        } else {
            await db.insert(menu).write()
        }
        return {
            success: true,
            msg: ""
        }
    },
    getMenuWithChildren: async (menuId) => {
        let db = await model.init(context)
        let menuList = JSON.parse(JSON.stringify(db.value()))
        let menuWithChildren = []
        let menu = menuList.filter(s => {
            return (s.parentId == 0 && menuId == 0) || s.id == menuId
        })
        let forFn = (parentId) => {
            let children = menuList.filter(s => {
                return s.parentId == parentId;
            })
            if (children.length > 0) {
                menuWithChildren.push(...children)
                for (let child of children) {
                    forFn(child.id)
                }
            }
        }
        if (menu.length > 0) {
            menuWithChildren.push(...menu)
            for (let m of menu) {
                forFn(m.id)
            }
        }

        return menuWithChildren
    },
    getMenuFunctions: async (menuId) => {
        let menuList = await menuService.getMenuWithChildren(menuId)
        let functionList = await functionService.getFunctionList()
        functionList = _.sortBy(functionList, ["name"])
        for (let menu of menuList) {
            menu.functions = functionList.filter(s => {
                return s.moduleId == menu.id
            })
        }
        return menuList;
    }
}
module.exports = menuService