import { Extend } from '@flarum/core/forum';
import { extend } from 'flarum/extend';
import Post from 'flarum/components/Post';

extend(Post.prototype, 'footerItems', function(items) {
  const post = this.props.post;
  if (post) {
    // console.log("Post Data", post.data);
    if (post.data.attributes.contentHtml) {
      const postLength = post.data.attributes.contentHtml.replace(/<[^>]*>?/gm, '').length;

      // console.log("Post Length", postLength);
      const authorID = parseInt(this.props.post.data.relationships.user.data.id);
      if (this.props.post.store.data.users[authorID].socialButtons) {
        const socialButtons = JSON.parse(this.props.post.store.data.users[authorID].data.attributes.socialButtons);
        if (socialButtons) {
          let likerButtons = socialButtons.filter((v) => { return v.title == 'Like'; });
          if (likerButtons.length) {
            const likerID = likerButtons[0].url.replace("https://button.like.co/", "");
            const discussionLink = `https://aspects.club/d/${this.props.post.data.id}`
            const likerLink = `https://button.like.co/in/embed/${likerID}/button?type=wp${discussionLink}`;
            // console.log("LikerID =", likerID);
            if (postLength > 500) {
              items.add('likecoin', <iframe scrolling="no" frameborder="0" style="height: 212px; width: 100%; max-width: 400px;" src={likerLink}></iframe>, 99);
            }
          }
        }
      }
    }
  }
});

console.log("inserts");
export const extendo = [
  // Your JavaScript extenders go here
];