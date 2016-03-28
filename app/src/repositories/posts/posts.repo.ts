import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import APIService from '../../services/api/api.svc';

export default class PostsRepository extends BaseRepository {
    
    constructor(private apiSvc:APIService) {
        super()
    }

    getRedditList() {
        return this.apiSvc.getRedditList().then((success) => {
            return this.filterAPI(success);
        }, (err) => {
            throw err;
        });
    }
    
    filterAPI(original:any) {
        let filtered:any = [];
        for (let i = 0; i < original.length; i++) {
            filtered[i] = {
                title: original[i].data.title,
                permalink: original[i].data.permalink,
                author: original[i].data.author,
                num_comments: original[i].data.num_comments,
                thumbnail: original[i].data.thumbnail,
                ups: original[i].data.ups
            };
        };
        return filtered;
    }
}

register.injectable('posts-repo', PostsRepository, [APIService]);
