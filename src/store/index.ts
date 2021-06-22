import { Offer } from "@/types/Offer";
import httpService from "@/store/httpService";
import { createStore } from "vuex";
import {UserCreditData} from "@/types/UserCreditData";

export default createStore({
  state: {
    userOffers: [] as Array<Offer>,
    userCreditData: {} as UserCreditData,
    userEmail: String
  },
  mutations: {
    setUserOffers (state, offers) {
      state.userOffers = offers
    },

    setUserCreditData (state, userCreditData) {
      state.userCreditData = userCreditData
    },

    setUserEmail (state, userEmail) {
      state.userEmail = userEmail
    }
  },
  actions: {
    findUserOffers ({ commit }) {
      return httpService.get('/offer').then(res => {
        const offers = res.data.map((offer: Offer) => {
          return {
            ...offer,
            finalValue: offer.fullPrice - offer.discountAmmount,
            discountPercent: offer.discountPercentage * 100,
            installmentsPrice: (offer.fullPrice - offer.discountAmmount) / offer.installments
          }
        })

        commit('setUserOffers', offers)
        return offers
      }).catch(err => {
        throw err
      })
    },

    finalizeCheckout ({ commit }, userCreditData) {
      return httpService.post("/subscription", userCreditData).then(res => {
        commit('setUserCreditData', userCreditData)
        return res.data
      }).catch(err => {
        throw err
      })
    },

    setUserEmail ({ commit }, userEmail) {
      commit('setUserEmail', userEmail)
    }
  },
  getters: {
    userOffers: state => state.userOffers,
    getOfferById: (state) => (offerId: number): Offer | never => {
      return state.userOffers.filter(offer => offer.id === offerId)[0]
    },
    userCreditCard: state => state.userCreditData,
    userEmail: state => state.userEmail
  },
  modules: {},
});
