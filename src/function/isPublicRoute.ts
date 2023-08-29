import { public_routes } from '../constants/public'

export const isPublicRoute = (pathname: string) => {
    const publics = Object.values(public_routes.public)

    return publics.includes(pathname)
}