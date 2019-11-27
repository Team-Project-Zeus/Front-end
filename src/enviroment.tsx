class Env {
    public production: Boolean = false;
    public environmentName: String;
    public baseUrl: string;
    public API_URL: string;
    public LOGIN_URL: string;
    public APPOINTMENT_URL: string;
    constructor() {
        if (this.production) {
            this.environmentName = 'PRODUCTION';
            this.baseUrl = "http://77.162.207.35"
        }
        else {
            this.environmentName = 'LOCAL';
            this.baseUrl = "http://localhost:8000"
        }
        this.API_URL = this.baseUrl + `/api/`;
        this.APPOINTMENT_URL = this.baseUrl + '/api/appointments/';
        this.LOGIN_URL = this.baseUrl + '/api/login';
    }

};

export const environment = new Env;