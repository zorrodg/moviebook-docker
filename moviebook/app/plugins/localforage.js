import Vue from 'vue';
import localforage from 'localforage';

const localforagePlugin = {
    install (vueClass) {
        localforage.config({
            driver: localforage.LOCALSTORAGE,
            storeName: 'MovieBook'
        });

        vueClass.prototype.$setItem = function (key, value) {
            return localforage.setItem(key, value);
        };

        vueClass.prototype.$getItem = function (key) {
            return localforage.getItem(key);
        };

        vueClass.prototype.$removeItem = function (key) {
            return localforage.removeItem(key);
        };

        vueClass.prototype.$clearStore = function () {
            return localforage.clear();
        };
    }
};

Vue.use(localforagePlugin);
