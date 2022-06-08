import React from 'react';
import {render, container} from '@testing-library/react';
import Transacao from './Transacao';

describe('Componente de trasanção dio extrato', () => {
  it('O snapshot do component deve sempre ser o mesmo', () => {
    const {container} = render(<Transacao 
      data="08/09/2020"
      tipo="saque"
      valor="20.00"
    />)
    expect(container.firstChild).toMatchSnapshot()
  })
})