import React, {
  useEffect, useReducer, useCallback, useMemo,
} from 'react';
import { getPost } from '../api/PostApi';
import { initialState, postReducer } from '../reducer/PostReducer';
import { POST } from '../const/ActionType';
import Loader from '../components/Loader';
import Comments from '../components/Comments';

const PostPage = (history) => {
  const { match } = history;
  const { id } = match.params;
  const [data, setData] = useReducer(postReducer, initialState);

  const getData = useCallback(async () => {
    const res = await getPost(id);
    setData({
      type: res.error ? POST.ERROR : POST.DONE,
      data: res,
    });
  }, [id]);

  const memoizedComments = useMemo(() => (<Comments id={id} />), [id]);

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
