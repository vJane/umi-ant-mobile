import { Model } from 'dva'
import { routerRedux } from 'dva/router'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const asyncError = () =>
  new Promise(resolve => {
    throw new Error('async error')
  })

export interface IGlobalState {
  counter: number
}
export interface IGlobalModel extends Model {
  state: IGlobalState
}

const globalModel: IGlobalModel = {
  namespace: 'global',
  state: { counter: 0 },
  reducers: {
    add: state => ({ ...state, counter: state.counter + 1 }),
    minus: state => ({ ...state, counter: state.counter - 1 })
  },
  effects: {
    addWithDelay: function*(action, { call, put }) {
      yield call(delay, 500)
      yield put({ type: 'add' })
    },
    redirect: function*(action, { put }) {
      yield put(routerRedux.push('/ts'))
    },
    triggerError: function*(action, { call }) {
      yield call(asyncError)
    }
  }
}

export default globalModel
