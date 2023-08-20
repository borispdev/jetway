import moment from 'moment'

// format date to more human readable format.
export function formatDateTime(datetime) {
    return moment(datetime).format('ddd DD[/]MM[/]YYYY HH:mm');
}

// format date to SQL suitable form.
export function dateTimeToISO(datetime) {
    let originDate = String(datetime).slice(4);
    return moment(originDate, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
}