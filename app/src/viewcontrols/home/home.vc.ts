import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import PostsRepository from '../../repositories/posts/posts.repo';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');

    context = {
        posts: <any>[]
    };
    
    constructor(private postsRepo:PostsRepository) {
        super()
    }
    
    navigatedTo():void {
        this.postsRepo.getRedditList().then((success) => {
            console.log(success.data.children);
            this.context.posts = success.data.children;
        }, (err) => {
            console.log(err);
        });
    }
}

register.viewControl('home-vc', HomeViewControl, [PostsRepository]);
