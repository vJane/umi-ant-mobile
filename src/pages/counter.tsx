import React, { SFC, MouseEvent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'dva'
import { Button } from 'antd-mobile'

export interface ICounterProps {
  count: number
  onAdd: () => any
  onTriggerError: () => any
  onRedirect: () => any
}

const Counter: SFC<ICounterProps> = ({
  onAdd,
  onTriggerError,
  onRedirect,
  count
}) => (
  <div>
    <div>Count: {count}</div>
    <br />
    <Button type="primary" onClick={onAdd}>
      Add
    </Button>
    <Button type="warning" onClick={onTriggerError}>
      TriggerError
    </Button>
    <Button onClick={onRedirect}>Redirect</Button>
  </div>
)

const mapStateToProps = ({ global: state }) => {
  return { count: state.counter }
}
const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  onAdd: (e: MouseEvent<HTMLElement>) => dispatch({ type: 'global/add' }),
  onTriggerError: (e: MouseEvent<HTMLElement>) =>
    dispatch({ type: 'global/triggerError' }),
  onRedirect: (e: MouseEvent<HTMLElement>) =>
    dispatch({ type: 'global/redirect' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
