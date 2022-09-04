import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import App from "../../App.vue";

/**
* @vitest-environment jsdom
*/

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toContain("logo");
  })

  it('loader works correctly', () => {
    const wrapper = mount(App, { data() { return { loading: true } } });
    expect(wrapper.html()).toContain("loader");
  })
})