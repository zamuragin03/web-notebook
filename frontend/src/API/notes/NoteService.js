import { useContext } from "react"
import AuthContext from "../../components/Context/AuthContext"
export default async function GetAllNotes() {
    const { authTokens } = useContext(AuthContext)
    try {
        const response = await fetch('api/get_notes', {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        }
        )

        return response.json()
    } catch (error) {
    }
}

