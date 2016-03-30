import {register} from 'platypus';
declare var moment:any;

export default class Formatter {
    formatDate(created_utc:any) {
        let a = moment(created_utc, "X").fromNow();
        return a;
    }
}

register.injectable('formatter', Formatter);
