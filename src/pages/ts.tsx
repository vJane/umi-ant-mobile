import React, { SFC } from 'react'
import { Button } from 'antd-mobile'
import DocumentTitle from 'react-document-title'

const TsPage: SFC = () => (
  <DocumentTitle title="TypeScript Powered">
    <Button>This is Ts Page</Button>
  </DocumentTitle>
)

export default TsPage
