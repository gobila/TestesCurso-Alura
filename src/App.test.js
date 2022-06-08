import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

describe(' Component principal', ()=>{
  describe('Qaundo eu abro o app do banco', ()=>{
    // test() e it() são a sinonimos 
    test('Quando eu abro o app do banco, o nome é exibido', ()=>{
      render(<App />);

      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });
    
    it('o saldo é exibido', ()=>{
      render(<App />);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });

    it('o botão realizar trasação é exibido', ()=>{
      render(<App />);
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  });

  describe('Quando eu realizo uma transação', ()=> {
    it('que é um saque, o valor vai diminuir', () => {
      const valores = {
        transacao: 'saque',
        valor: 50
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(100);
    });
    it('que é um deposito, o valor deve aumentar', ()=> {
      const valores = {
        transacao: 'deposito',
        valor: 50
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(200);
    });
    it('que é um saque com valor maior, o saldo deve ser negativo', ()=> {
      const valores = {
        transacao: 'saque',
        valor: 200
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);

      expect(novoSaldo).toBe(-50);
    });
    // it('que é um saque, a trasação deve ser realizada', () =>{

    //   const {getByText, getByTestId, getByLabelText} = render(<App />)
       
    //   const saldo = getByText('R$ 1000');
    //   const transacao = getByLabelText('Saque');
    //   const valor = getByTestId('valor');
    //   const botaoTrasacao = getByText('Realizar operação');

    //   expect(saldo.textContent).toBe('R$ 1000')

    //   fireEvent.click(transacao, { target : {value: 'saque'}})
    //   fireEvent.change(valor, { target : {value: 10}})
    //   fireEvent.click(botaoTrasacao)

    //   expect(saldo.textContent).toBe('R$ 990')
    // });
  
    it('que é um saque, a trasação deve ser realizada - ALTERNATIVA', () =>{

      render(<App />)
       
      const saldo = screen.getByText('R$ 1000');
      const transacao = screen.getByLabelText('Saque');
      const valor = screen.getByTestId('valor');
      const botaoTrasacao = screen.getByText('Realizar operação');

      expect(saldo.textContent).toBe('R$ 1000')

      fireEvent.click(transacao, { target : {value: 'saque'}})
      fireEvent.change(valor, { target : {value: 10}})
      fireEvent.click(botaoTrasacao)

      expect(saldo.textContent).toBe('R$ 990')
    })
  })
});