import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PhotoDetailModal from '../../components/PhotoDetailModal';

configure({ adapter: new Adapter() });

describe('Modal Photo', () => {
  const component = mount(<PhotoDetailModal isShown={false} />);

  it('skip on initial render with shown status false', () => {
    expect(component.exists()).toEqual(true);
    expect(component.exists('.tdd-modal-photo')).toEqual(false);
    component.setProps({ isShown: true });
    component.update();
    expect(component.exists('.tdd-modal-photo')).toEqual(true);
  });

  it('does not skip view on initial render if shown status true', () => {
    const defaultOpenComponent = mount(<PhotoDetailModal isShown />);
    expect(defaultOpenComponent.exists()).toEqual(true);
    expect(defaultOpenComponent.exists('.tdd-modal-photo')).toEqual(true);
  });

  it('always open when parent change its shown status props', () => {
    component.setProps({ isShown: false });
    component.update();
    expect(component.exists('.tdd-modal-photo')).toEqual(true);
    component.setProps({ isShown: true });
    component.update();
    expect(component.exists('.tdd-modal-photo')).toEqual(true);
  });

  it('does not explode when photo is not defined', () => {
    const componentWithNoPhoto = mount(<PhotoDetailModal isShown />);
    expect(componentWithNoPhoto.exists()).toEqual(true);
  });

  it('show detail when data photo is present', () => {
    const componentWithPhoto = mount(
      <PhotoDetailModal isShown photo={{ title: 'photo title', url: 'link-to-photo' }} />,
    );
    expect(componentWithPhoto.exists()).toEqual(true);
    expect(componentWithPhoto.find('.figure-img').last().prop('src')).toEqual('link-to-photo');
    expect(componentWithPhoto.find('.figure-caption').first().text()).toEqual('photo title');
  });
});
