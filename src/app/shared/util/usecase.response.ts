export class UsecaseResponse {
    public static notFound(field: string) {
        return {
            ok: false,
            message: `${field} not found`,
            cod: 404
        }
    }

    public static unauthorized() {
        return {
            ok: false,
            message: `Invalid credentials`,
            cod: 401
        }
    }

    public static success(message: string, data: any) {
        return {
            ok: true,
            message,
            cod: 200,
            data
        }
    }
}