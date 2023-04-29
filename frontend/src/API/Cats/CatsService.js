export default class CatsService {
    static async get_all_cats() {
        const response = await fetch('/api/get_cats')
        return response.json()
    }
}