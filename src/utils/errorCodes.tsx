

const errorCodes = {
    403: "De email of het wachtwoord dat je hebt ingevoerd is onjuist.",
    422: "De email of het wachtwoord dat je hebt ingevoerd is onjuist.",
    404: "kan geen verbinding krijgen met de server",
    429: "Teveel login pogingen",
    500: "u heeft geen toegang naar deze pagina"
};


export var createError = function (errorCode: number) {
    switch (errorCode) {
        case 403:
            return (errorCodes[403]);
        case 422:
            return (errorCodes[422]);
        case 404:
            return (errorCodes[404]);
        case 500:
            return (errorCodes[500]);
        case 429:
            return (errorCodes[429]);
        case 500:
            return (errorCodes[500]);
        default:
            return "onbekende error!";

    }
}