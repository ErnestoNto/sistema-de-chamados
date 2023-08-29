export const getAuth = () => {
    const user = JSON.parse(localStorage.getItem('users')!)

    return !!user
}