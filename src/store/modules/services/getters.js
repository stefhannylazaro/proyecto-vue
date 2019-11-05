import state from "./state";

export default {
    listServices: state => {
        return state.listServices;
    },
    filterType: state => {
        return state.filterType;
    },
    // actionType: state => {
    //     return state.actionType;
    // },
}
