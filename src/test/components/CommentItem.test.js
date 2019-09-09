import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CommentItem from '../../components/CommentItem';
import { CommentsProvider } from '../../context/CommentsContext';

configure({ adapter: new Adapter() });
const body = 'laudantium enim quasi est quidem magnam voluptate ipsam';
const comment = {
  postId: 1,
  id: 1,
  name: 'id labore ex et quam laborum',
  email: 'Eliseo@gardner.biz',
  body,
};
const btnEdit = '.btn-toolbar .btn-primary';
const btnCancel = '.form-group .btn-secondary';

describe('Add Comment', () => {
  const component = mount(
    <CommentsProvider>
      <CommentItem comment={comment} key={comment.id} />
    </CommentsProvider>,
  );

  it('show correct input value when user click edit comment', () => {
    expect(component.exists('#comment-item')).toEqual(false);
    component.find(btnEdit).first().simulate('click');
    expect(component.exists('#comment-item')).toEqual(true);
    expect(component.find('#comment-item').instance().value).toEqual(body);
  });

  it('simulate cancel correctly after input changes hasn`t been save', () => {
    component.find('#comment-item').instance().value = 'new input value';
    component.find(btnCancel).first().simulate('click');
    expect(component.exists('#comment-item')).toEqual(false);
    component.find(btnEdit).first().simulate('click');
    expect(component.exists('#comment-item')).toEqual(true);
    expect(component.find('#comment-item').instance().value).toEqual(body);
  });
});
