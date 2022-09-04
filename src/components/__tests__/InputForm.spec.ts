import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import InputForm from "../InputForm.vue";


/**
* @vitest-environment jsdom
*/

describe('InputForm', () => {
  it('renders properly', () => {
    const wrapper = mount(InputForm);
    expect(wrapper.html()).toContain("input");
  })

  it('button is disabled', () => {
    let wrapper = mount(InputForm, { data() { return { loading: true } } });
    expect(wrapper.get("button").element.disabled).toBe(true);
  })

  it('string is not encoded (too long)', () => {
    let wrapper = mount(InputForm, { data() { return { inputString: "This is a very very very very very very very very very very very very very very very long string that won't encode." } } });
    wrapper.vm.encodeInputString();
    setTimeout(() => {
      expect(wrapper.vm.$data.encodedString).toStrictEqual([""]);
    }, 400);
  })

  it('string is encoded', () => {
    let wrapper = mount(InputForm, { data() { return { inputString: "That's one small step for man, one giant leap for mankind." } } });
    wrapper.vm.encodeInputString();
    setTimeout(() => {
      expect(wrapper.vm.$data.encodedString).toStrictEqual(["tetaafi", "hsennon", "ampotrd", "tafnlm ", "sloeea ", "olrgan ", "nsmipk "]);
    }, 400);
  })
})