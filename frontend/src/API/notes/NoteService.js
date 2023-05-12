
export const GetAllNotes = async (access) => {
    let response = await fetch('api/get_notes', {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    })
    return response
}

export const createNote = async (access, body, cat_id, userId) => {
    let response = await fetch(`/api/create_note/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({
            'body': body,
            'category': cat_id,
            'user': userId,
        })
    })
    return response
}

export const getNote = async (access, id) => {
    let response = await fetch(`/api/get_note/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
    return response
}


export const updateNote = async (access, id, data) => {
    let body = {}
    if (Number.isInteger(data)) {
        body['category'] = data
    }
    else {
        body['body']=data
    }
    await fetch(`/api/update_note/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify(body)
    })
}


export const deleteNote = async (access, id) => {
    await fetch(`/api/delete_note/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    })
}



