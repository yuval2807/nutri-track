import { PostData } from "../../queries/post";
import { PostCard } from "./PostCard";

export interface PostsListData {
  postList: PostData[];
  direction?: "column" | "row";
  setRefresh: (flag: boolean) => any;
  showAction?: boolean;
}

export const PostsList: React.FC<PostsListData> = ({
  postList,
  direction = "column",
  setRefresh,
  showAction,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: direction === "row" ? "repeat(3, 1fr)" : "1fr",
        gap: "16px",
      }}>
      {postList.map((post: PostData) => (
        <PostCard
          key={post?._id}
          post={post}
          setRefresh={setRefresh}
          showAction={showAction}
        />
      ))}
    </div>
  );
};
