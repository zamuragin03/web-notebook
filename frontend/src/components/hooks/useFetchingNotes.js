import { useState } from 'react';
export const useFetching = (callback) => {
    const [IsLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fetching = async () =>{
        try {
            setIsLoading(true)
            await callback()
            
        } catch (error) {
            setError(error.message);
        }
        finally{
            setIsLoading(false)
        }
    }
    return [fetching, IsLoading, error]
}


