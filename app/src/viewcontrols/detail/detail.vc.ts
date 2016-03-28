import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class DetailViewControl extends BaseViewControl {
    templateString: string = require('./detail.vc.html');

    context: any = {};
}

register.viewControl('detail-vc', DetailViewControl);
