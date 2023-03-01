
import { useOptionChain,fetchData } from '../query/useOptionChain'
import Table from '../components/Table'

import { useOptionChainStore } from '../query/useOptionChainStore';
import Head from 'next/head';
import Loader from '../components/Loader';
import Error from '../components/Error';

export default function Home() {
  const contracts = useOptionChainStore((state) => state.contracts);
  
  const {data,isLoading,isError} = useOptionChain(contracts)
  
  if(isLoading)
  return <Loader/>
  if(isError)
  return <Error/>
  
//  const records = data.records.data
 const filtered = data.filtered.data === undefined ? <Loader/> : data.filtered.data
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

