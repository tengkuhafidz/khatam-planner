export const load = (({ url }) => {
    let days = Number(url.searchParams.get('days'));
    if (!days || isNaN(days) || days < 1) {
        days = 29;
    }

    let startingPage = Number(url.searchParams.get('startingPage'));
    if (!startingPage || isNaN(startingPage) || startingPage < 1) {
        startingPage = 1;
    }


    return {
        days: days,
        startingPage: startingPage
    };
});