export function SuccessResponse ( data ) {
    return {
        status: 'success',
        message: 'Success',
        data
    }
}

export function FailedResponse ( error ) {
    return {
        status: 'failed',
        message: error?.response?.data?.message || error.toString(),
        error
    }
}