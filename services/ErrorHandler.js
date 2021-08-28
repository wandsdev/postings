export default {
    errorDefault: 'Ocorreu um erro. Contacte um administrador !',
    checkErrorData(error) {
        if (error.response && error.response.data && error.response.data) {
            return Object.keys(error.response.data).length ? error.response.data : false;
        }
        return false;
    },
    getError(error) {
        const errorData = this.checkErrorData(error);
        if (errorData) {
            if (errorData.error) {
                return errorData.error.message;
            }
            if (errorData.exception) {
                return errorData.message;
            }

            return this.errorDefault;
        }
    },
    getMessagesByFormRequestValidations(error) {
        if (this.checkErrorData(error)) {
            return error.response.data.errors;
        }
        return null;
    }
}
