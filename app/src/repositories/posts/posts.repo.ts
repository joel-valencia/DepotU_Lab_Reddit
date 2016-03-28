import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import APIService from '../../services/api/api.svc';

export default class PostsRepository extends BaseRepository {
    
    constructor(private apiSvc:APIService) {
        super()
    }

    getRedditList() {
        return this.apiSvc.getRedditList();
    }
}

register.injectable('posts-repo', PostsRepository, [APIService]);
