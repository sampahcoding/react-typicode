import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PostsProvider } from '../../context/PostsContext';
import PostEditModal from '../../components/PostEditModal';

configure({ adapter: new Adapter() });

describe('Edit post modal', () => {
  const component = mount(
    <PostsProvider posts={[]}>
      <PostEditModal isShown post={{}} />
    </PostsProvider>,
  );

  it('skip on initial render', () => {
    expect(component.exists()).toEqual(true);
    expect(component.exists('.tdd-modal')).toEqual(false);
    component.setProps({
      children: (
        <PostEditModal
          isShown={false}
          post={{}}
        />
      ),
    });
    component.update();
    expect(component.exists('.tdd-modal')).toEqual(true);
  });

  it('always open when parent change its shown status props', () => {
    component.setProps({
      children: (
        <PostEditModal
          isShown={false}
          post={{}}
        />
      ),
    });
    component.update();
    expect(component.exists('.tdd-modal')).toEqual(true);
    component.setProps({
      children: (
        <PostEditModal
          isShown
          post={{}}
        />
      ),
    });
    component.update();
    expect(component.exists('.tdd-modal')).toEqual(true);
  });

  it('show detail for add post when props post is an empty object', () => {
    expect(component.exists()).toEqual(true);
    expect(component.find('.modal-title').first().text()).toEqual('Add Post');
  });

  it('show detail for edit post when props post have correct object value', () => {
    component.setProps({
      children: (
        <PostEditModal
          isShown
          post={{ id: 1, title: 'test', body: 'test' }}
        />
      ),
    });
    component.update();
    expect(component.exists()).toEqual(true);
    expect(component.find('.modal-title').first().text()).toEqual('Edit - test');
  });

  it('closing modal on stimulate clicking close button', () => {
    component.setProps({
      children: (
        <PostEditModal
          isShown
          post={{ id: 1, title: 'test', body: 'test' }}
        />
      ),
    });
    component.update();
    expect(component.exists('.tdd-modal')).toEqual(true);
    component.find('.tdd-close').first().simulate('click');
    expect(component.exists('.tdd-modal')).toEqual(false);
  });
});
