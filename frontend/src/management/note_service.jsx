class NoteDTO {
    constructor(id, body) {
        this.id = id;
        this.body = body
    }
    
}
class NoteService{
    async updateNote(Note) {
        fetch(`/api/update_note/${Note.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Note)


        })
    }
    async getConcreteBody(Note) {
        let response = await fetch(`/api/get_note/${Note.id}`)
        if (response.status === 200) {
            return response.json()
        }
    }
}