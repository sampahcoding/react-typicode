import React, {
  useEffect, useReducer, useCallback, useMemo,
} from 'react';
import { getPost } from '../api/PostApi';
import { initialState, postReducer } from '../reducer/PostReducer';
import { POST } from '../const/ActionType';
import Loader from '../components/Loader';
import Comments from '../components/Comments';
import { CommentsProvider } from '../context/CommentsContext';
import getParamId from '../helper/Browser';

const PostPage = (history) => {
  const id = getParamId(history);
  const [data, setData] = useReducer(postReducer, initialState);

  const getData = useCallback(async () => {
    const res = await getPost(id);
    setData({
      type: res.error ? POST.ERROR : POST.DONE,
      data: res,
    });
  }, [id]);

  const memoizedComments = useMemo(() => (
    <CommentsProvider>
      <Comments id={id} />
    </CommentsProvider>
  ), [id]);

  useEffect(() => {
    setData({ type: POST.LOADING });
    setTimeout(getData, 500);
  }, [getData]);

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
