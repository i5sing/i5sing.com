/**
 * Created by zhaofeng on 2016/12/2.
 */
import {
    RECEIVE_PRODUCTS,
    ADD_TO_CART
} from '../mutation-types'

// initial state
export const state = {
    all: []
};

// mutations
export const mutations = {
    [RECEIVE_PRODUCTS] (state, products) {
        state.all = products
    },

    [ADD_TO_CART] (state, productId) {
        state.all.find(p => p.id === productId).inventory--
    }
};