import Vue from "vue";
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      resume: {
        about: {
          name: "",
          email: "",
          phone: "",
          address: "",
          others: [""]
        },
        sections: []
      }
    }),
    mutations: {
      addSection(state, name) {
        setPush(state.resume.sections, { name: name, elements: [] });
      },
      removeSection(state, section) {
        state.resume.sections = state.resume.sections.filter(s => s != section);
      },
      addElement(state, payload) {
        let element = {
          title: payload.title,
          subTitle: "",
          location: "",
          date: "",
          lineItems: [""]
        };
        setPush(payload.section.elements, element);
      },
      removeElement(state, payload) {
        Vue.set(
          payload.section, 'elements',
          payload.section.elements.filter(e => e != payload.element)
        );
      },
      updateAboutLineItems(state, payload) {
        updateLineItems({ list: state.resume.about.others, ...payload });
      },
      updateElementLineItems(state, payload) {
        updateLineItems(payload);
      }
    }
  })
};

const setPush = (list, obj) => Vue.set(list, list.length, obj);

const updateLineItems = (o) => {
  Vue.set(o.list, o.index, o.value);

  let numEmpties = o.list.filter(i => !i.length).length;
  if (!o.value.length && numEmpties > 1) {
    Vue.delete(o.list, o.index);
  } else if (numEmpties == 0) {
    o.list.push("");
  }
};

export default createStore
