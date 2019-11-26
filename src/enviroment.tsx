class Env {
    public production: Boolean = false;
    public environmentName: String;
    public baseUrl: string;

    constructor() {
        if (this.production) {
            this.environmentName = 'PRODUCTION';
            this.baseUrl = "http://77.162.207.35"
        }
        else {
            this.environmentName = 'LOCAL';
            this.baseUrl = "localhost"
        }

    }

    API_URL: string = this.baseUrl + `/api/`;
    LOGIN_URL: string = this.baseUrl + '/api/login';
    APPOINTMENT_URL: string = this.baseUrl + '/api/appointments/';
};

export const environment = new Env;