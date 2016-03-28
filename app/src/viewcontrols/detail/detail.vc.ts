import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import PostsRepository from '../../repositories/posts/posts.repo';


export default class DetailViewControl extends BaseViewControl {
    templateString: string = require('./detail.vc.html');

    context: any = {
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
        this.postsRepo.getSinglePost(this.context.id).then((success) => {
            console.log(success);
            this.context.post = success;
        }, (err) => {
            console.log(err);
        });
    }
    
    toggleZoom() {
        let currentClass = document.getElementById("image_full").className;
        if (currentClass == "") {
            document.getElementById("image_full").className = "zoom_out";
        } else {
            document.getElementById("image_full").className = ""
        }
    }
}

register.viewControl('detail-vc', DetailViewControl, [PostsRepository]);
