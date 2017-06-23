import { Post } from '../../../models/Post.model';

export class WallService {
  wallPosts: Post[] = [];

  addPost(wallPost: Post) {
    this.wallPosts.push(wallPost);
  }
  getPosts() {
    return this.wallPosts;
  }
  removeAll() {
    this.wallPosts = [];
  }
}
