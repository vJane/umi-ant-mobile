import Link from 'umi/link'
import DocumentTitle from 'react-document-title'
import { Button } from 'antd-mobile'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &.am-button-primary {
    background-color: #000;
    border: 1px solid #000;
  }
`

export default () => (
  <DocumentTitle title="Index">
    <>
      <Link to="/counter">
        <Button>Counter</Button>
      </Link>
      <StyledButton type="primary">Styled Button</StyledButton>
    </>
  </DocumentTitle>
)
