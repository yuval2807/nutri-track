import { PostCard, PostData } from "./PostCard";

export interface PostsListData {
    postList: PostData[];
}

export const PostsList: React.FC<PostsListData> = ({ postList }) => {

  return (
    <div>
        {postList.map((post: PostData) => (<PostCard title={post?.title} content={post?.content} image={post?.image} />))}
    </div>
  );
};