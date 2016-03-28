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
        // get post id
        this.context.id = params.id;
        console.log(this.context.id);
        
        // get all posts
        this.postsRepo.getRedditList().then((success) => {
            console.log(success);
            this.context.posts = success;
            // find post with that id
            this.findSinglePost();
        }, (err) => {
            console.log(err);
        });
    }
    
    findSinglePost() {
        for (let i = 0; i < this.context.posts.length; i++) {
            if (this.context.posts[i].id == this.context.id) {
                this.context.post = this.context.posts[i];
            }
        }
        console.log(this.context.post);
    }
}

register.viewControl('detail-vc', DetailViewControl, [PostsRepository]);
