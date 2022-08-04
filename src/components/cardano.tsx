import { useAsync } from 'react-async'
import Loading from './loading'

const Cardano = () => {
  const { data, error, isLoading } = useAsync({ promiseFn: getCardanoData })
  const diff = dateDiff(data?.response.ended_before)

  return (
    <section>
      <div>
        <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
          Cardano Stats
        </h2>
        { isLoading ? (
          <Loading />
          // <div className="p-4 max-w-sm w-full mx-auto">
          //   <div className="animate-pulse flex space-x-4">
          //     <div className="bg-gray-300 h-20 w-20"></div>
          //     <div className="flex-1 space-y-4 py-1">
          //       <div className="h-4 bg-gray-300 w-3/4"></div>
          //       <div className="space-y-2">
          //         <div className="h-4 bg-gray-300 rounded"></div>
          //         <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        ) : (
          <>
          <div>
            {/* <h4 className="text-2xl">Pool ID</h4>
            <small>{data?.response.data.pool_id}</small> */}
            <div>
              <p>
                <span className="mb-8 text-3xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {data?.response.epoch_last}
                </span> Epoch {diff.days}d {diff.hours}h
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 md:col-gap-8 lg:col-gap-16">
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {(parseInt(data?.response.total_deleg)/1000).toFixed(0)}k
                  </span> Delegators
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {(data?.response.total_staked/1000000000000000).toFixed(2)}B
                  </span> Active Stake
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {(data?.response.total_staked_active/1000000000000000).toFixed(2)}B
                  </span> Live Stake
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {(data?.response.ada_circ/1000000000000000).toFixed(2)}B
                  </span> Total Supply
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                    {data?.response.slot_last}
                  </span> Slot {((data?.response.slot_last/data?.response.conf_slots_epoch)*100).toFixed(0)}%
                </p>
                <div className="shadow w-full bg-gray-200">
                  <div className="py-1 text-center text-white" style={{
                    width:((data?.response.slot_last/data?.response.conf_slots_epoch)*100).toFixed(0).concat("%"),
                    backgroundColor:"gold"}}></div>
                </div>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {parseInt(data?.response.total_pools).toFixed(0)}k
                  </span> Pools
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {(data?.response.price).toFixed(2)}
                  </span> ₳ USD
                </p>
              </div>
              <div>
                <p>
                  <span className="mb-8 text-2xl md:text-5xl font-bold tracking-tighter leading-tight">
                  {((data?.response.price)/(data?.response.price_btc)).toFixed(6)}
                  </span> ₳ BTC
                </p>
              </div>
            </div>

          </div>
          <div className="flex-col text-right place-items-end">
            <small>Source: <a href="https://adapools.org" target="_blank">ADAPools.org</a></small>
          </div>
          <br/>
          </>
        )}
      </div>
    </section>
  )
}

export default Cardano


export async function getCardanoData() {
  const url = "https://js.adapools.org/global.json"
  const response = await fetch(url)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

  console.log(response)

  return {
    response
  }
}

export function dateDiff(startTimeStamp) {
  const timeStamp = startTimeStamp + (60*60*24*5)
  const date = new Date(timeStamp * 1000).getTime()
  const now = new Date().getTime()
  const days =  Math.floor(( date - now ) / 86400000); //24 * 60 * 60 * 1000
  const hours =  Math.floor((( date - now ) % 86400000) / 3600000); //60 * 60 * 1000
  return {
    days,
    hours
  }
}