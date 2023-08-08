import moment from 'moment'

export function formatDateTime(datetime) {
    return moment(datetime).format('ddd DD[/]MM[/]YYYY HH:mm');
}

export function dateTimeToISO(datetime) {
    let originDate = String(datetime).slice(4);
    return moment(originDate, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
}