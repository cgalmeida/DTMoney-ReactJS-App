import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions'
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;

}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(0);
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {

        event.preventDefault()

        await createTransaction({
            title, 
            amount: value,
            category,
            type,
        })

        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');
        onRequestClose();

    }

    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transacao</h2>
                <input placeholder="Titulo"  
                value={title}
                onChange={event => setTitle(event.target.value)}
                />
                <input 
                type="number" 
                placeholder="Valor" 
                value={value}
                onChange={event => setValue(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida"/>
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                placeholder="Categoria" 
                value={category}
                onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
        </button>

            </Container>
        </Modal>
    )
}