export default class NoteService {
    static async get_all_notes() {
        try {
            const response = await fetch('api/get_notes')
            return response.json()
        } catch (error) {
            console.log(error);
        }

    }
}