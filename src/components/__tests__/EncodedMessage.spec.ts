import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import EncodedMessage from "../EncodedMessage.vue";

/**
* @vitest-environment jsdom
*/

describe('EncodedMessage', () => {
  it('renders properly', () => {
    const wrapper = mount(EncodedMessage);
    expect(wrapper.html()).toContain("h1");
  })

  it('list has correct number of items', () => {
    const wrapper = mount(EncodedMessage, { props: { encodedString: ["tetaafi", "hsennon", "ampotrd", "tafnlm ", "sloeea ", "olrgan ", "nsmipk "] } });
    expect(wrapper.findAll("li").length).toBe(7);
  })

  it('sends prop correctly', () => {
    const wrapper = mount(EncodedMessage, { props: { encodedString: ["tetaafi", "hsennon", "ampotrd", "tafnlm ", "sloeea ", "olrgan ", "nsmipk "] } });
    expect(wrapper.props().encodedString).toStrictEqual(["tetaafi", "hsennon", "ampotrd", "tafnlm ", "sloeea ", "olrgan ", "nsmipk "]);
  })
})