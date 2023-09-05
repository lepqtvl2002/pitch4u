"use server";

export async function actionLogin(formData : FormData) {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
        const res = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })

        console.log(await res.json());
    } catch (e) {
        return {
            error : "Error"
        }
    }
}