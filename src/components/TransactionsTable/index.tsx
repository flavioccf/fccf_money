import { useEffect } from "react"
import { api } from "../../services/api"
import { Container } from "./styles"

export function TransactionsTable() {
  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
    .then(response => console.log(response.data))
    .catch(err =>{throw new Error(err)})
  },[])
  return(
    <>
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dev Web</td>
            <td className="deposit">R$ 12000</td>
            <td>Dev</td>
            <td>20/02/2021</td>
          </tr>
          <tr>
            <td>Dev Web</td>
            <td className="withdraw">- R$ 12000</td>
            <td>Dev</td>
            <td>20/02/2021</td>
          </tr>
          <tr>
            <td>Dev Web</td>
            <td className="deposit">R$ 12000</td>
            <td>Dev</td>
            <td>20/02/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
    </>
  )
}