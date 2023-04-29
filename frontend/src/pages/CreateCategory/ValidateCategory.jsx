let  validateCat = (category) =>{
    if (category.color == null) {
        return 'Define category color'
    }
    if (category.name == null) {
        return 'Define category name'
    }
    return false
}
export default validateCat