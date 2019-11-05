import * as types from './mutation-types'
import * as firebase from 'firebase'

export default {
    getListServices: ({commit},payload=null) => {
        commit(types.SAVE_FILTER_TYPE, payload);
        commit(types.SAVE_LIST_SERVICES, null);
        return new Promise((resolve, reject) => {
            let requestFirebase
            if(payload === 'Todos' || payload === null){
                requestFirebase = firebase.database().ref('services')
            } else {
                requestFirebase = firebase.database().ref('services').orderByChild('category').equalTo(payload)
            }
            requestFirebase.once('value')
                .then((response) => {
                    const data = response.val()
                    const listServices = []
                    for (let key in data) {
                        const service = data[key]
                        service.id = key
                        listServices.push(service)
                    }
                    commit(types.SAVE_LIST_SERVICES, listServices);
                    resolve(true)
                }).catch(err => {
                console.log(err);
                reject(err)
            })
        })
    },

    saveService: ({getters,commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('services').push(payload)
                .then((response) => {
                    if((payload.category == getters.filterType) || (getters.filterType == 'Todos')) {
                        dispatch("getListServices", getters.filterType)
                    }
                    resolve(true)
                }).catch(err => {
                console.log(err);
                reject(err)
            })

        })
    },

    updateService: ({getters,commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('services').child(payload.id).update(payload.dataEdit)
                .then((response) => {
                    dispatch("getListServices", getters.filterType)
                    resolve(true)
                }).catch(err => {
                console.log(err);
                reject(err)
            })
        })
    },

    deleteService: ({getters,commit, dispatch}, payload) => {
        return new Promise((resolve, reject) => {
            firebase.database().ref('services').child(payload).remove()
                .then((response) => {
                    dispatch("getListServices", getters.filterType)
                    resolve(true)
                }).catch(err => {
                console.log(err);
                reject(err)
            })
        })
    },
}
