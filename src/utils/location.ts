import config from "../config";

export const goToPlayNow = (isGuest=false) => {
    const params = new URLSearchParams(window.location.search);
    const invitationToken = params.get('invitation-token');

    const url = new URL(config.playUrl);
    if(isGuest) {
        url.searchParams.append('is_guest', 'true');
    }
    if(invitationToken) {
        url.searchParams.append('invitation-token', invitationToken);
    }
    window.location.href = url.href;
};

export const LOGIN_PATH = '/login';
export const HOME_PATH = '/';
