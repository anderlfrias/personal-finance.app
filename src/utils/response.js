export function SuccessResponse ( data = {} ) {
    return {
        status: 'success',
        message: '',
        data
    }
}

export function FailedResponse ( error ) {
    return {
        status: 'failed',
        message: error?.response?.data?.messageCode ? `errors.${error?.response?.data?.messageCode}` : 'errors.unexpected',
        error
    }
}