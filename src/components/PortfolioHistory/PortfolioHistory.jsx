import { getDataFromCovalentAPI } from '../../utils/api'

const PortfolioHistory = ({ chainId, walletAddress }) => {
  const URL = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/portfolio_v2/`
  getDataFromCovalentAPI(URL)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
}

export default PortfolioHistory
