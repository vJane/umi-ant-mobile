import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import { Icon } from 'antd'
import { SearchBar, ListView } from 'antd-mobile'

let pageIndex = -1 //页码
const listLength = 10 //每页显示长度

const mapStateToProps = ({scrollList: state}) => {
  return {
    dataSource: state.dataSource  //接口返回dataSource
  }
}
const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({  // 获取数据
  fetchData: () => dispatch({type: 'scrollList/fetchData', options: {pageIndex, listLength}})
})

export interface IUserListProps {
  fetchData: any,
  dataSource: any
}

export interface IUserListState {
  isLoading: boolean,
  dataSource: any,
  data: Array<Object>
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UserList extends React.Component<IUserListProps, IUserListState> {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })

    this.state = {
      isLoading: false,
      dataSource,
      data: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      let data = this.state.data.concat(nextProps.dataSource)
      this.setState({
        data,
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
    }
  }

  fetchData() {
    this.setState({
      isLoading: true
    })
    pageIndex ++
    this.props.fetchData();
  }

  render() {
    let { dataSource } = this.state
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{ borderBottom: '1px solid #ECECED'}}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '10px', lineHeight: 1.5 }}>
          <div>{rowData.name}</div>
          <div>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.desc}</div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        pageSize={listLength}
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={()=>this.fetchData()}
        onEndReachedThreshold={10}
      />
    )
  }
}
