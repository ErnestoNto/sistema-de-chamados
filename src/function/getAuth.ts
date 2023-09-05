export const getAuth = () => {
    const user = localStorage.getItem('users')

        return !!user
}