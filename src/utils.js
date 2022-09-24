const getCookie = (cookieName) => {
    return document.cookie
            .split(";")
            .find((row) => row.includes(cookieName + "="))
            ?.split("=")[1];
}

const setCookie = (cookieName, value, maxAge) => {
    document.cookie = `${cookieName}=${value};${maxAge ? ("max-age=" + maxAge) : ""}`;
};

const clearCookie = (cookieName) => {
    const expireDate = new Date();
    document.cookie = `${cookieName}="";expires=${expireDate.getSeconds() + 1}`;
}

export { getCookie, setCookie, clearCookie };