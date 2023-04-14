  import React, { useState } from 'react';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import Transaction from './components/Transaction';
  import SaldoBox from './components/SaldoBox';
  import AddTransaction from './components/AddTransaction';

  const iniTransactions = [
    {
      "id": "987654456789",
      "tanggal": new Date("01 Nov 2021 9:30").getTime(),
      "keterangan": "gaji bulanan",
      "nominal": 250000,
    },  
    {
      "id": "434565432",
      "tanggal": new Date("03 Nov 2021 19:30").getTime(),
      "keterangan": "thr",
      "nominal": 250000,
    },
    {
      "id": "92343289",
      "tanggal": new Date("20 Nov 2021 11:30").getTime(),
      "keterangan": "Jajan",
      "nominal": -120000,
    },
  ];

  const App = () => {
    const [transactions, setTransactions] = useState(iniTransactions);

    const handleTambahTransaction = (data) => {
      let newTransaction = [
        ...transactions, data
      ];

      newTransaction.sort((a,b) => a.tanggal - b.tanggal);
      setTransactions([...newTransaction]);
      // console.log('Transaksi'+data)
    }

    const handleHapusTransaction = (e) => {
      const result = transactions.findIndex(
        transaction => (transaction.id === e.target.id)
      );
      
      const newTransactions = transactions;
      newTransactions.splice(result,1);
      setTransactions([...newTransactions]);
    }

    return (
      <React.Fragment>
        <Header />
        <SaldoBox transactions={transactions}/>
        <Transaction transactions={transactions} onHapusTransaction={handleHapusTransaction}/>
        <AddTransaction onTambahTransaction={handleTambahTransaction}/>
        <Footer />
      </React.Fragment>
    )
  }

  export default App;
