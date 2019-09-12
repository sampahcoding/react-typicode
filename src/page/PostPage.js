import React, { useMemo } from 'react';
import { GetPost } from '../api/PostApi';
import Loader from '../components/Loader';
import Comments from '../components/Comments';
import { CommentsProvider } from '../context/CommentsContext';
import getParamId from '../helper/Browser';

const PostPage = (history) => {
  const id = getParamId(history);
  const data = GetPost(id);

  const memoizedComments = useMemo(() => (
    <CommentsProvider>
      <Comments id={id} />
    </CommentsProvider>
  ), [id]);

  return (
    <>
      {data.isLoading && <Loader />}
      {data.isError && <p>Something wrong....</p>}
      {
        data.isDone && (
          <>
            <h4>{data.post.title}</h4>
            <br />
            {data.post.body}
            <br />
            <br />
          </>
        )
      }
      {memoizedComments}
    </>
  );
};

export default PostPage;
