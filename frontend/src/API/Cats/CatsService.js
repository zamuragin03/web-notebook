
export  const get_all_cats = async () => {
    const response = await fetch('/api/get_cats')
    return response.json()
}

export  const createCat = async (access, category) => {
    let response = await fetch(`/api/create_cat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`

        },
        body: JSON.stringify(category)
    })
    return response
}
export  const getCat = async (category) => {
    let response = await fetch(`/api/get_cat/${category}`)
    return response
}
