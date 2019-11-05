import {
    SAVE_LIST_SERVICES,
    SAVE_FILTER_TYPE,
} from './mutation-types'

export default {
    [SAVE_LIST_SERVICES]: (state, payload) => {
        state.listServices = payload
    },
    [SAVE_FILTER_TYPE]: (state, payload) => {
        state.filterType = payload
    },
}
