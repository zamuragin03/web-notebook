export default class BirthdayService {
    static async get_all_birthdays() {
        const response = await fetch('api/get_birthdays')
        return response.json()
    }
}