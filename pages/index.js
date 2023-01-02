
import { useOptionChain,fetchData } from '../query/useOptionChain'
import Table from '../components/Table'

import { useOptionChainStore } from '../query/useOptionChainStore';
import Head from 'next/head';

export default function Home() {
  const contracts = useOptionChainStore((state) => state.contracts);
  
  const {data,isLoading} = useOptionChain(contracts)
  
  if(isLoading)
  return <h1>Loading....</h1>
  
//  const records = data.records.data
 const filtered = data.filtered.data
 const total = data.filtered
 
  return (
    <>
    <Head>
    <title>{contracts}</title>
      <meta property="openchain" content="home" key="chain" />
    </Head>
      <div className="text-4xl">
        <Table filtered={filtered} total={total}/>
      </div>
    </>
  )
}

