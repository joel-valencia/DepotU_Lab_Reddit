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
            let preview:any = original[i].data.preview;
            let image_full:any = null;
            
            if (preview != undefined) {
                image_full = preview.images[0].source.url;
            } else {
                image_full = "not found";
            }
            
            //console.log(i, image_full, image_medium, original[i].data.title);
            
            filtered[i] = {
                title:          original[i].data.title,
                permalink:      original[i].data.permalink,
                author:         original[i].data.author,
                num_comments:   original[i].data.num_comments,
                thumbnail:      original[i].data.thumbnail,
                ups:            original[i].data.ups,
                id:             original[i].data.id,
                url:            original[i].data.url,
                selftext:       original[i].data.selftext,
                image_full:     image_full
            };
        };
        return filtered;
    }
}

register.injectable('posts-repo', PostsRepository, [APIService]);
