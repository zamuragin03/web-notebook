export const getAllBirthdays = async () => {
    const response = await fetch('api/get_birthdays')
    return response.json()
}

export const createBirthday = async (birthday) => {
    let response = await fetch(`/api/create_birthday/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(birthday)
    })
    return response
}

export const getBirthdyay = async (id) => {
    let response = await fetch(`/api/get_birthday/${id}`)
    return response
}


export const updateBirthday = async (id, birthday, description) => {
    await fetch(`/api/update_birthday/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'birthday': birthday, 'description': description })
    })
}


export const deleteBirthday = async (id) => {
    await fetch(`/api/delete_birthday/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}