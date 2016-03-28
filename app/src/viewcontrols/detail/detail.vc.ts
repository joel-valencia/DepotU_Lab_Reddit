import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import PostsRepository from '../../repositories/posts/posts.repo';


export default class DetailViewControl extends BaseViewControl {
    templateString: string = require('./detail.vc.html');

    context: any = {
        posts: <any>[],
        post: {},
        id: ""
    };
    
    constructor(private postsRepo:PostsRepository) {
        super()
    }
    
    navigatedTo(params:any):void {
        this.context.id = params.id;
        console.log(this.context.id);
        
        this.postsRepo.getRedditList().then((success) => {
            console.log(success);
            this.context.posts = success;
        }, (err) => {
            console.log(err);
        });
    }
}

register.viewControl('detail-vc', DetailViewControl, [PostsRepository]);
