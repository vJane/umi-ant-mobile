const mockData = (() => {
  let arr = []
  for (let i = 0; i < 30; i++) {
    arr[i] = {
      name: 'index' + i,
      desc: '描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字'
    }
  }
  return arr
})()

export interface ScrollState {
  dataSource: any
}
export interface ScrollListModal {
  state: ScrollState
  [key: string]: any
}

const scrollList: ScrollListModal = {
  namespace: 'scrollList',
  state: { dataSource: [] },
  reducers: {
    updateData: (state, dataSource) => ({ ...state, ...dataSource })
  },
  effects: {
    fetchData: function*(action, { call, put }) {
      const dataSource = yield call(getDataList, action.options)
      yield put({ type: 'updateData', dataSource })
    }
  }
}

function getDataList(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let start = options.pageIndex * options.listLength
      let end = start + options.listLength
      resolve(mockData.slice(start, end))
    }, 1000)
  })
}
export default scrollList
