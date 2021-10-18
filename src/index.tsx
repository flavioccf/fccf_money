import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

enum modelEnum {
  TRANSACTION_MODEL = 'transaction'
}

createServer({
  models: {
    [modelEnum.TRANSACTION_MODEL]: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance Website',
          type: 'deposit',
          category: 'dev',
          value: 6000,
          createdAt: new Date('2021-02-12')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'pagamentos',
          value: 4000,
          createdAt: new Date('2021-02-15')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all(modelEnum.TRANSACTION_MODEL)
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create(modelEnum.TRANSACTION_MODEL, data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
