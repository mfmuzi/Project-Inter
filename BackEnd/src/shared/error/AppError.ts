class AppError {

    public readonly message: string;
    public readonly statusCode: number;
    public readonly data?: any;

    constructor(message: string, statuCode = 400, data?: any){
        this.message = message;
        this.statusCode = statuCode;
        this.data = data;
    }
}

export default AppError;