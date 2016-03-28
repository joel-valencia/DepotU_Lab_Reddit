import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class APIService extends BaseService {
        getRedditList():async.IAjaxThenable<any> {
        return this.http.json({
            method: 'GET',
            url: this.host + '/mildlyinteresting/.json',
        }).then(
            (success) => {
                //console.log(success);
                return success.response.data.children;
            },
            (error): any => {
                throw error.response.message;
            }
        );
    }



}

register.injectable('api-svc', APIService);
