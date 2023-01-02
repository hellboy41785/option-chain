
import { useOptionChain,fetchData } from '../query/useOptionChain'
import Table from '../components/Table'

import { useOptionChainStore } from '../query/useOptionChainStore';

export default function Home() {
  const contracts = useOptionChainStore((state) => state.contracts);
  
  const {data,isLoading} = useOptionChain(contracts)
  
  if(isLoading)
  return <h1>Loading....</h1>
  
//  const records = data.records.data
 const filtered = data.filtered.data
 
  return (
    <>
      <div className="text-4xl">
        <Table filtered={filtered}/>
      </div>
    </>
  )
}

