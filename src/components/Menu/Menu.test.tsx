import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const TestMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>hello</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .antd-submenu {
      display:none;
    }
    .antd-submenu.menu-opened{
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

describe('test Menu and MenuItem component', () => {
  let wrapper: RenderResult,
    menuElement: HTMLElement,
    activeElement: HTMLElement,
    disabledElement: HTMLElement;
  beforeEach(() => {
    wrapper = render(TestMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('antd-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('menu-item is-active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('hello');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenLastCalledWith('1');
  });
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(TestMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('antd-menu menu-vertical');
  });
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
  it('should show dropdown items if it is vertical mode', () => {
    cleanup();
    const wrapper = render(TestMenu(testVerticalProps));
    expect(wrapper.getByText('drop1')).toBeVisible();
  });
});
