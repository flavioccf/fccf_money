import Modal from "react-modal";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
Modal.setAppElement('#root')

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export enum depositTypeEnum {
  DEPOSIT_TYPE = 'deposit',
  WITHDRAW_TYPE = 'withdraw'
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
  const [type, setType] = useState(depositTypeEnum.DEPOSIT_TYPE)
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const handleCreateNewTransaction = (event: FormEvent) => {
    event.preventDefault()
    const data = {
      title,
      value,
      type,
      category
    }
    api.post('/transactions', data)
  }

  return (
    <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        contentLabel="Example Modal"
      >
        <button className="react-modal-close" type="button" onClick={onRequestClose}>
          <img src={closeImg} alt="Close"/>
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <input type="number" placeholder="Valor" onChange={(e) => setValue(Number(e.target.value))} value={value}/>

        <TransactionTypeContainer>
          <RadioBox
            onClick={() => setType(depositTypeEnum.DEPOSIT_TYPE)}
            type="button"
            isActive={type === depositTypeEnum.DEPOSIT_TYPE}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
          onClick={() => setType(depositTypeEnum.WITHDRAW_TYPE)}
            type="button"
            isActive={type === depositTypeEnum.WITHDRAW_TYPE}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input placeholder="Categoria" onChange={(e) => setCategory(e.target.value)} value={category}/>
        <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
  )
}