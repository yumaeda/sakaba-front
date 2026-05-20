const getPostOption = (token: string, payload: { [key: string]: string }) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    }
}

export { getPostOption }
