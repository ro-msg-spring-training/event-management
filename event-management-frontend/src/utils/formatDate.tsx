export const formatDate = (date: Date, delimiter: string) => {
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;
    let yyyy: any = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return mm + delimiter + dd + delimiter + yyyy;
}