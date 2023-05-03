
interface ErrorResponse {
    message?: string;
    errors?: [{
      param: string
    }]
}

const unknownError = ['Something went wrong. Please try again later.'];

export const getErrorMessages = async (response: Response): Promise<string[]> => {
    if(response.status >= 500) {
        return unknownError;
    }
    const responseData = await response.json() as ErrorResponse | undefined;
    if(!responseData) {
        return unknownError;
    }
    if(responseData.message) {
        return [responseData.message];
    }
    if(responseData.errors) {
        const errors = responseData.errors.map((err) => {
            if(err.param === 'password') {
                return 'Password must be at least 8 characters long';
            }
            return `Invalid ${err.param}`;
        });
        if(errors.length > 0) {
            return errors;
        }
    }
    return unknownError;
}
