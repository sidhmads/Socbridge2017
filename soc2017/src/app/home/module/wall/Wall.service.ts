import {WallModel} from './Wall.model';

export class WallService {
  wallPosts: WallModel[] = [];

  addPost(wallPost: WallModel) {
    this.wallPosts.push(wallPost);
  }
  getPosts() {
    return this.wallPosts;
  }
}
