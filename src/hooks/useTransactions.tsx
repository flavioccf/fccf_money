import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { depositTypeEnum } from "../components/NewTransactionModal";
import { api } from "../services/api";

interface TransactionInterface {
  id: number;
  title: string;
  type: depositTypeEnum;
  value: number;
  category: string;
  createdAt?: Date;
}

interface TransactionsContextInterface {
  transactions: TransactionInterface[];
  createTransaction: (transaction: TransactionInputInterface) => Promise<void>;
}

type TransactionInputInterface = Omit<TransactionInterface, "id" | "createdAt">;

interface TransactionProviderInterface {
  children: ReactNode;
}

const TransactionContext = createContext<TransactionsContextInterface>(
  {} as TransactionsContextInterface
);

export const TransactionsProvider = ({
  children,
}: TransactionProviderInterface) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  useEffect(() => {
    api
      .get("http://localhost:3000/api/transactions")
      .then((response) => setTransactions(response.data.transactions))
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const createTransaction = async (transaction: TransactionInputInterface) => {
    try {
      const response = await api.post("/transactions", transaction);
      setTransactions([...transactions, response.data.transaction]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}
