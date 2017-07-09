import Vue from 'vue';
import Vuex from 'vuex';
import Hello from '@/components/Hello';
import mapState from 'vuex'

Vue.use(Vuex);

describe('Hello.vue', () => {
  let mockedStore;
  let Constructor;
  let vm;

  beforeEach(function() {
    mockedStore = {
      state: {
        count: 0
      },
      mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
      }
    };

    Constructor = Vue.extend(Hello)
    vm = new Constructor({ store: new Vuex.Store(mockedStore)}).$mount()
  });

  it('should render correct contents', () => {
    // const Constructor = Vue.extend(Hello);
    // const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
  it('should have increment function', () => {
    expect(typeof Hello.methods.increment).to.equal('function');
  });
  it('should decrement properly', () => {
    vm.decrement();
    expect(vm.$store.state.count).to.equal(-1);
  });
});
