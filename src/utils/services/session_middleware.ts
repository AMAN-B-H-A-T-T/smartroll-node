import { base_url } from 'utils/base_url';
const fetch = require('node-fetch')

export async function validate_teacher_session(token: string | undefined,session_id :string | undefined): Promise<{status:boolean,message:string}> {
    if (!token) {
        return {status : false, message : "Token is not Found"}; // Return false if the token is not provided
    }

    try {
        const res = await fetch(`${base_url}/manage/session/authenticate_teacher/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({ session_id : session_id,}),
        });

        
        if (!res.ok) {
            const error = await res.json();
            console.log(error.message)
            return {status : false,message : error.message};
        }

        const data:any = await res.json(); // Assume the API returns JSON
        return {status:true,message:data.message}
    } catch (error:any) {
        
        console.error('Error validating teacher session:', error);
        return {status : false,message : error.message}; // Return false on error
    }
}
