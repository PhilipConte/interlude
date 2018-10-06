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
          adress: "",
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
      }
    }
  })
};

const setPush = (list, obj) => Vue.set(list, list.length, obj);

export default createStore
