export enum IUserRole {
    ROLE_USER,
    ROLE_TEACHER,
    ROLE_ADMIN,
    ROLE_DEPARTMENT
}

export function DispayRole(role: IUserRole): string {
    let strRole = role.toString()
    console.log(strRole)
    if (strRole === 'ROLE_USER') {
        return "Студент"
    }
    else if (strRole === 'ROLE_DEPARTMENT') {
        return "Деканат"
    }
    else if (strRole === 'ROLE_TEACHER') {
        return "Преподаватель"
    }
    if (strRole === 'ROLE_ADMIN') {
        return "Администратор"
    }
    return role.toString().toLowerCase()
}