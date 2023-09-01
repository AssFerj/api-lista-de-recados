export class UsecaseResponse {
    public static notFound(field: string) {
        return {
            ok: false,
            message: field,
            code: 404
        }
    }

    public static unauthorized() {
        return {
            ok: false,
            message: `Invalid credentials`,
            code: 401
        }
    }

    public static success(message: string, data: any) {
        return {
            ok: true,
            message,
            code: 200,
            data
        }
    }

    public static alreadyExist(message: string) {
        return {
            ok: false,
            message,
            code: 400,
        }
    }
}