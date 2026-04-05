class APIERROR extends Error {
    constructor(message?: any, public statusCode: any = 500, public body: any = null) {
        const msg = message && message.length ? message : "something went wrong";
        super(msg);
        this.name = "APIERROR";
        this.statusCode = statusCode;
        this.body = body;
        Object.setPrototypeOf(this, APIERROR.prototype);
    }
}

module.exports = APIERROR;